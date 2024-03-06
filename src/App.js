import { useState } from "react";
import "./App.css";
import FormTextInput from "./components/FormTextInput";
import FormDateSelector from "./components/FormDateSelector";
import headerImage from "./res/main-logo.png";
import Alert from "@mui/material/Alert";

const initialFormData = {
  full_name: "",
  contact_number: "",
  day: "",
  month: "",
  year: "",
  email: "",
  password: "",
  confirm_password: "",
};

const App = () => {
  const [formData, setFormData] = useState({ ...initialFormData });
  const [errors, setErrors] = useState({ ...initialFormData });
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);

  const formAPIData = {
    full_name: formData.full_name,
    contact_number: formData.contact_number,
    email: formData.email,
    date_of_birth: formData.day + formData.month + formData.year,
    password: formData.password,
  };

  const validateForm = () => {
    const newErrors = {};

    //Validation to check if any symbols are present
    if (/[^a-zA-Z\s]/.test(formData.full_name)) {
      newErrors.full_name =
        "Sorry, this full name is not valid. Please try again.";
    }

    //Validation to check if it contains exact 10 digits
    if (!/^\d{10}$/.test(formData.contact_number)) {
      newErrors.contact_number =
        "Sorry, this contact number is not valid. Please try again.";
    }

    //Validation for proper email format
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Sorry, this email is not valid. Please try again.";
    }

    // Validate password for lowercase, uppercase, numbers, and minimum length of 8 characters
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long.";
    }

    // Validate confirm_password to match password
    if (formData.confirm_password !== formData.password) {
      newErrors.confirm_password =
        "Sorry Passwords do not match. Please try again.";
    }

    // Validate if date is in the past
    const selectedDate = new Date(
      formData.year,
      formData.month - 1,
      formData.day
    );
    const currentDate = new Date();
    if (selectedDate > currentDate) {
      newErrors.date = "Selected date cannot be in the future.";
    }

    setErrors(newErrors);

    //Return true if 0 errors, else false
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      console.log(formData);
      try {
        const response = await fetch(
          "https://fullstack-test-navy.vercel.app/api/users/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formAPIData),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to create user");
        }
        // Handle successful response
        const responseData = await response.json();
        setAlertType(responseData.title);
        setAlertMessage(responseData.description);
        setFormData({ ...initialFormData });
      } catch (error) {
        setAlertType("Error");
        setAlertMessage("Error creating user:", error.message);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;

    //Check if any fields are left empty
    if (typeof value === "string" ? value.trim() === "" : value != null) {
      setErrors({
        ...errors,
        [name]: "This field can not be empty. Please enter valid input.",
      });
    }
  };

  const handleCancel = () => {
    // Clear the form when cancel button is clicked
    setFormData({ ...initialFormData });
  };

  return (
    <div className="app">
      <div className="header">
        <img className="header-logo-img" src={headerImage} alt="header-img" />
      </div>
      {alertType === "Success" && (
        <div className="alert-container">
          <Alert variant="filled" severity="success">
            {alertMessage}
          </Alert>
        </div>
      )}
      {alertType === "Error" && (
        <div className="alert-container">
          <Alert variant="filled" severity="error"></Alert>
        </div>
      )}
      <form className="reg-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Create User Account</h2>
        <div className="form-input-container">
          <FormTextInput
            name="full_name"
            label="Full Name"
            placeholder="Full Name"
            errorMessage={errors.full_name}
            value={formData.full_name}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />

          <FormTextInput
            name="contact_number"
            label="Contact Number"
            type="tel"
            placeholder="Contact Number"
            errorMessage={errors.contact_number}
            value={formData.contact_number}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />

          <FormDateSelector
            label="Birthdate"
            day={formData.day}
            month={formData.month}
            year={formData.year}
            onChange={handleInputChange}
          />

          <FormTextInput
            name="email"
            label="Email Address"
            type="email"
            placeholder="Email Address"
            errorMessage={errors.email}
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />

          <FormTextInput
            name="password"
            label="Password"
            type="password"
            placeholder="Create Password"
            errorMessage={errors.password}
            value={formData.password}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />

          <FormTextInput
            name="confirm_password"
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            errorMessage={errors.confirm_password}
            value={formData.confirm_password}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </div>

        <div className="form-button-container">
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>

          <button className="submit-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
