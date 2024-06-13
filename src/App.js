import React, { useEffect, useState } from "react";

import { Field, Form, Formik } from "formik";
import { supabase, supabaseAdminAuth } from "./Configs/supabase";

import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Pages/Navbar";
import { useRoutes } from "react-router-dom";
import { routes } from "./Routes";

function App() {
  // State to store the user data
  const [userEmail, setUserEmail] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const [phone, setPhone] = useState(null);

  // Asynchronous function to fetch user data
  const fetchUser = async () => {
    try {
      // Get the current authenticated user's email
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        throw error;
      }

      if (user) {
        const userEmail = user.email;
        const phone = user.phone;
        const { role } = user.user_metadata;
        console.log("Fetched user: ", user);

        // Set user email state
        setUserEmail(userEmail);
        setPhone(phone);
        setUserRole(role);

        // Fetch user profile data from 'profiles' table by email
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("username, role")
          .eq("email", userEmail)
          .single();

        if (profileError) {
          throw profileError;
        }

        // Set user role and other data
        setUserRole(profileData.role);
        setUserData(profileData);

        console.log("Fetched user profile: ", profileData);
      } else {
        // If no user is found, reset states
        setUserEmail(null);
        setUserRole(null);
        setUserData(null);
      }
    } catch (error) {
      console.error("Error fetching user: ", error.message);
    }
  };

  // Use effect to fetch user data on component mount
  useEffect(() => {
    fetchUser();
  }, []);

  // Handler for sign-up form
  const handleCreateUser = async (values) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });
      if (error) {
        throw error;
      }
      alert("Sign-up success! Please check your email to confirm.");
      console.log("Sign-up data: ", data);
      fetchUser(); // Fetch user again after sign-up
    } catch (error) {
      alert(`Error creating user: ${error.message}`);
      console.error("Sign-up error: ", error.message);
    }
  };

  // Handler for sign-in form
  const handleLoginUser = async (values) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) {
        throw error;
      }
      alert("Login success!");
      console.log("Sign-in data: ", data);
      fetchUser(); // Fetch user again after sign-in
    } catch (error) {
      alert(`Error signing in: ${error.message}`);
      console.error("Sign-in error: ", error.message);
    }
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const AppRoutes = useRoutes(routes);

  return (
    <div>
      <Header />
      {AppRoutes}
      {/* <h1>Sign-up / Login</h1> */}

      {/* Sign-up form */}
      {/* <h2>Sign Up</h2>
      <Formik initialValues={initialValues} onSubmit={handleCreateUser}>
        {({ values, handleChange, handleBlur, isSubmitting }) => (
          <Form>
            <div>
              <label id="email">Email</label>
              <Field
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label>Password</label>
              <Field
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter password"
              />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Sign Up
            </button>
          </Form>
        )}
      </Formik> */}

      {/* Sign-in form */}
      {/* <h2>Login</h2>
      <Formik initialValues={initialValues} onSubmit={handleLoginUser}>
        {({ values, handleChange, handleBlur, isSubmitting }) => (
          <Form>
            <div>
              <label id="email">Email</label>
              <Field
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label>Password</label>
              <Field
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter password"
              />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Sign In
            </button>
          </Form>
        )}
      </Formik> */}

      {/* Display user email if user is available */}
      <p>{userEmail ? `User email: ${userEmail}` : "No user logged in"}</p>
      <p>{userRole ? `User role is: ${userRole}` : "No user role"}</p>
      <p>{phone ? `User phone is: ${phone}` : "No user phone"}</p>

      {/* <HomePage />
      <AuthPage />
      <AboutPage /> */}
    </div>
  );
}

export default App;
