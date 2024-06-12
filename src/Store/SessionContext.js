import React from "react";
import { supabase } from "../Configs/supabase";
import { CONSTANTS } from "./AppContext";
const SessionContext = React.createContext(null);

function SessionApp({ children }) {
  const [session, setSession] = React.useState(null);
  React.useEffect(() => {
    const {data: {subscription}} = supabase.auth.onAuthStateChange((event, session) => {
      if (event === CONSTANTS.SIGN_OUT) {
        setSession(null);
      } else if (session) {
        setSession(session);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export default SessionApp;
