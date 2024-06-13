import { useContext, useEffect, useReducer, useState } from "react";
import { supabase } from "../Configs/supabase";
import { AuthContext } from "./AuthContext";

// Define action constants
export const CONSTANTS = {
  INITIAL_SESSION: "INITIAL_SESSION",
  SIGN_IN: "SIGNED_IN",
  SIGN_UP: "SIGNED_UP",
  SIGN_OUT: "SIGNED_OUT",
  PASSWORD_RECOVERY: "PASSWORD_RECOVERY",
  TOKEN_REFRESHED: "TOKEN_REFRESHED",
  USER_UPDATED: "USER_UPDATED",
  ERROR: "ERROR",
  SET: "SET",
};

// Define default authentication state
export const DefaultAuthState = {
  user: null,
  error: null,
};

// Define authentication reducer function
export const AuthReducer = (state, action) => {
  switch (action.type) {
    case CONSTANTS.SIGN_UP:
    case CONSTANTS.SIGN_IN:
    case CONSTANTS.INITIAL_SESSION:
    case CONSTANTS.USER_UPDATED:
      return {
        ...state,
        user: action.payload.user,
        error: null,
      };
    case CONSTANTS.SET:
      return {
        ...state,
        user: action.payload.user,
      };
    case CONSTANTS.SIGN_OUT:
      return {
        ...state,
        user: null,
        error: null,
      };
    case CONSTANTS.PASSWORD_RECOVERY:
    case CONSTANTS.TOKEN_REFRESHED:
      return state; // No user data to update, just handle these events
    case CONSTANTS.ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

// Define authentication provider component
export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [state, dispatch] = useReducer(AuthReducer, DefaultAuthState);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Event :", event);
      console.log("Session :", session);

      if (event === "INITIAL_SESSION" || session) {
        dispatch({
          type: CONSTANTS.INITIAL_SESSION,
          payload: { user: session?.user },
        });
        setSession(session);
      } else if (
        event === CONSTANTS.SIGN_UP ||
        event === CONSTANTS.SIGN_IN ||
        session
      ) {
        dispatch({
          type: CONSTANTS.SIGN_IN,
          payload: { user: session.user },
        });
        setSession(session);
      } else if (event === "SIGNED_OUT") {
        dispatch({
          type: CONSTANTS.SIGN_OUT,
        });
        setSession(null);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUpHandler = async (email, password) => {
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        throw error;
      }
      dispatch({
        type: CONSTANTS.SIGN_UP,
        payload: { user },
      });
      alert("Confirmation mail sent to mail-box, please confirm");
    } catch (error) {
      dispatch({
        type: CONSTANTS.ERROR,
        payload: { error },
      });
      throw error;
    }
  };

  const signInHandler = async (email, password) => {
    try {
      const { user, error } = await supabase.auth.signIn({
        email,
        password,
      });
      if (error) {
        throw error;
      }
      dispatch({
        type: CONSTANTS.SIGN_IN,
        payload: { user },
      });
      alert("Login success");
    } catch (error) {
      dispatch({
        type: CONSTANTS.ERROR,
        payload: { error },
      });
      throw error;
    }
  };

  const signOutHandler = async () => {
    try {
      await supabase.auth.signOut();
      dispatch({
        type: CONSTANTS.SIGN_OUT,
      });
    } catch (error) {
      dispatch({
        type: CONSTANTS.ERROR,
        payload: { error },
      });
      throw error;
    }
  };

  const AppValue = {
    user: state.user,
    error: state.error,
    signInHandler,
    signOutHandler,
    signUpHandler,
    session,
  };

  return (
    <AuthContext.Provider value={AppValue}>{children}</AuthContext.Provider>
  );
};

export const useAppContext = () => useContext(AuthContext);
