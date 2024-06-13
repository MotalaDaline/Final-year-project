import React from "react";
import { supabase, supabaseAdminAuth, supabaseAuth } from "../Configs/supabase";
import { Form, Formik, Field } from "formik";

export default function AuthPage() {
  const [existingUser, setExistingUser] = React.useState(false);
  const [adminState, setAdminState] = React.useState(false);
  const [employeeState, setEmployeeState] = React.useState(false);

  const handleExistingUserState = () => {
    setExistingUser((prevState) => !prevState);
  };

  const handleEmployeeState = () => {
    setEmployeeState(true);
    setAdminState(false);
  };
  const handleAdminState = () => {
    setAdminState(true);
    setEmployeeState(false);
  };

  const handleCreateUser = async (values) => {
    if (adminState) {
      try {
        // Create admin user with additional metadata
        const { data, error } = await supabaseAdminAuth.admin.createUser({
          email: values.email,
          password: values.password,
          phone: values.phoneNumber,
          user_metadata: {
            role: "admin",
            fullName: values.fullName,
            phone: values.phoneNumber,
          },
        });

        if (error) {
          throw error;
        }
        alert("Admin sign-up success! Please check your email to confirm.");
        console.log("Admin sign-up data: ", data);
      } catch (error) {
        alert(`Error creating admin user: ${error.message}`);
        console.error("Admin sign-up error: ", error.message);
      }
    } else {
      try {
        // Create regular user
        const { data, error } = await supabaseAuth.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            data: {
              fullName: values.fullName,
              phone: values.phoneNumber,
              role: "user",
            },
          },
        });
        await supabaseAuth.auth.updateUser({
          phone: values.phoneNumber,
        });

        if (error) {
          throw error;
        }

        // Insert or update user profile with username
        const userId = data.user.id;
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .upsert([
            {
              id: userId,
              username: values.username,
              role: "user",
            },
          ]);

        if (profileError) {
          throw profileError;
        }

        alert("Sign-up success! Please check your email to confirm.");
        console.log("Sign-up data: ", data);
        console.log("Profile data: ", profileData);
      } catch (error) {
        alert(`Error creating user: ${error.message}`);
        console.error("Sign-up error: ", error.message);
      }
    }
  };

  const handleLoginUser = async (values) => {
    try {
      // Sign in the user
      const { data, error } = await supabaseAuth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        throw error;
      }

      // If login is successful, fetch user details and metadata
      const user = data.user;
      const userId = user.id;

      alert("Login success!");
      console.log(user);
      console.log(userId);

      // You can redirect the user or perform other actions here
    } catch (error) {
      alert(`Error signing in: ${error.message}`);
      console.error("Sign-in error: ", error.message);
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        phoneNumber: "",
        fullName: "",
        password: "",
        isAmin: adminState,
        isEmployee: employeeState,
      }}
      onSubmit={!existingUser ? handleCreateUser : handleLoginUser}
    >
      {({ values, handleChange, handleBlur, isSubimitting }) => (
        <Form>
          {!existingUser && (
            <div>
              <label id="fullName">Full Names</label>
              <Field
                name="fullName"
                type="text"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Full Name"
              />
            </div>
          )}
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
          {!existingUser && (
            <div>
              <label id="phoneNumber">Phone Number</label>
              <Field
                name="phoneNumber"
                type="tel"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Phone Number"
              />
            </div>
          )}
          <div>
            <label id="password">Password</label>
            <Field
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter Password"
            />
          </div>

          <div>
            <p>
              <span>
                {!existingUser ? (
                  <span> Already have an account ?</span>
                ) : (
                  <span>New user ?</span>
                )}
              </span>
              {!existingUser ? (
                <span onClick={handleExistingUserState}>Login.</span>
              ) : (
                <span onClick={handleExistingUserState}>Create Account</span>
              )}
            </p>
          </div>

          {!existingUser && (
            <div>
              <div>
                <label id="isAmin">Admin</label>
                <input
                  type="checkbox"
                  name="isAdmin"
                  id="isAdmin"
                  value={values.isAdmin}
                  onChange={handleAdminState}
                  checked={adminState}
                  onBlur={handleBlur}
                />
              </div>
              <div>
                <label id="isEmployee">Employee</label>
                <input
                  type="checkbox"
                  name="isEmployee"
                  id="isEmployee"
                  value={values.isEmployee}
                  onChange={handleEmployeeState}
                  checked={employeeState}
                  onBlur={handleBlur}
                />
              </div>
            </div>
          )}

          <button disabled={isSubimitting} type="submit">
            {!existingUser ? "Create Account" : "Login"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
