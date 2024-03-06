import { useState } from "react";
import "./App.css";
import FormTextInput from "./components/FormTextInput";
import FormDateSelector from "./components/FormDateSelector";
import headerImage from "./res/main-logo.png";

const App = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    contact_number: "",
    day: "",
    month: "",
    year: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="app">
      <div className="header">
        <img className="header-logo-img" src={headerImage} alt="header-img" />
      </div>
      <form className="reg-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Create User Account</h2>
        <div className="form-input-container">
          <FormTextInput
            name="full_name"
            label="Full Name"
            placeholder="Full Name"
            errorMessage="Sorry, this full name is not valid. Please try again."
            value={formData.full_name}
            onChange={handleInputChange}
          />

          <FormTextInput
            name="contact_number"
            label="Contact Number"
            type="tel"
            placeholder="Contact Number"
            errorMessage="Sorry, this contact number is not valid. Please try again."
            value={formData.contact_number}
            onChange={handleInputChange}
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
            errorMessage="Sorry, this email address is not valid. Please try again."
            value={formData.email}
            onChange={handleInputChange}
          />

          <FormTextInput
            name="password"
            label="Password"
            type="password"
            placeholder="Create Password"
            errorMessage="Sorry, this password is not valid. Please try again."
            value={formData.password}
            onChange={handleInputChange}
          />

          <FormTextInput
            name="confirm_password"
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            errorMessage="Sorry, this must be same as password field. Please try again."
            value={formData.confirm_password}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-button-container">
          <button className="cancel-button" type="reset">
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
