import React, { useState } from "react";
import "./Registration.css";

function Forms() {
  const [alert, setAlert] = useState({
    firstName: "",
    Email: "",
    Password: "",
    RepeatPassword: ""
  });

  const [formData, setFormData] = useState({
    firstName: "",
    Email: "",
    Password: "",
    RepeatPassword: ""
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Clear the specific error message when the user starts typing
    setAlert((prevAlert) => ({ ...prevAlert, [name]: "" }));
  }

  function validateEmail(email) {
    // Simple email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // ... (previous code)

function handleSubmit(e) {
    e.preventDefault();
  
    let messageBox = {
      firstName: "",
      Email: "",
      Password: "",
      RepeatPassword: ""
    };
  
    // Constraint: Name should not be greater than 30 characters and less than 3 characters
    if (formData.firstName.length > 0 && (formData.firstName.length < 3 || formData.firstName.length > 30)) {
      messageBox.firstName = "Name should be between 3 and 30 characters";
    }
  
    // Constraint: Name cannot contain numbers or special characters
    if (formData.firstName.length > 0 && /[^a-zA-Z]/.test(formData.firstName)) {
      messageBox.firstName = "Name cannot be a Number";
    }
  
    // Constraint: Email must be a valid email
    if (formData.Email.length > 0 && !validateEmail(formData.Email)) {
      messageBox.Email = "Please enter a valid email address";
    }
  
    // Constraint: Password should be at least 10 characters long, with at least one special character
    if (formData.Password.length > 0 && (formData.Password.length < 10 || !/[!@#$%^&*(),.?":{}|<>]/.test(formData.Password))) {
      messageBox.Password = "Password should be at least 10 characters long with at least one special character";
    }
  
    // Constraint: Repeat Password should match the Password field
    if (formData.RepeatPassword.length > 0 && formData.RepeatPassword !== formData.Password) {
      messageBox.RepeatPassword = "Passwords do not match";
    }
  
    setAlert(messageBox);
  
    if (
      messageBox.firstName === "" &&
      messageBox.Email === "" &&
      messageBox.Password === "" &&
      messageBox.RepeatPassword === ""
    ) {
      setRegistrationSuccess(true);
    } else {
      // If there are validation errors, reset registration success state
      setRegistrationSuccess(false);
    }
  }
  

  
  return (
    <>
      <div className="Forms">
        <h1 className="head">Create Account</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">
            <input
              required
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your Name"
            />
            <div className="error-message">{alert.firstName}</div>
          </label>

          <label htmlFor="Email">
            <input
              required
              type="text"
              id="Email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              placeholder="Enter your valid Email"
            />
            <div className="error-message">{alert.Email}</div>
          </label>

          <label htmlFor="Password">
            <input
              required
              type="password"
              id="Password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              placeholder="Enter your Password"
            />
            <div className="error-message">{alert.Password}</div>
          </label>

          <label htmlFor="RepeatPassword">
            <input
              required
              type="password"
              id="RepeatPassword"
              name="RepeatPassword"
              value={formData.RepeatPassword}
              onChange={handleChange}
              placeholder="Repeat your Password"
            />
            <div className="error-message">{alert.RepeatPassword}</div>
          </label>

          <label>
            <input type="submit" className="submit" value="Sign Up" />
          </label>
        </form>

        <div className="register">
          {registrationSuccess && <div>Registration Successful!</div>}
        </div>
      </div>
    </>
  );
}

export default Forms;
