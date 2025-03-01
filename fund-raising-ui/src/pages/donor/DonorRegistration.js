import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";

const DonorRegister = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    ssn: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors and messages
    setErrors({});
    setSuccessMessage("");
    setErrorMessage("");

    // Validation
    let formIsValid = true;
    const updatedErrors = {};

    for (const key in user) {
      if (!user[key]) {
        updatedErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
        formIsValid = false;
      }
    }

    if (user.password !== user.confirmPassword) {
      updatedErrors.confirmPassword = "Passwords do not match";
      formIsValid = false;
    }

    setErrors(updatedErrors);

    if (formIsValid) {
      try {
        await api.post("/donors", user);
        setSuccessMessage("Registration successful");
        setTimeout(() => {
          navigate("/donor/login");
        }, 1500);
      } catch (error) {
        setErrorMessage("Registration failed. Please try again.");
        console.error("Registration failed:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Create an account
        </h2>
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-sm mb-4">{successMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className={`w-full px-4 py-3 rounded-md border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-blue-500`}
              placeholder="First Name"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              className={`w-full px-4 py-3 rounded-md border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-blue-500`}
              placeholder="Last Name"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="email"
              className={`w-full px-4 py-3 rounded-md border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-blue-500`}
              placeholder="Email address"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              className={`w-full px-4 py-3 rounded-md border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-blue-500`}
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              className={`w-full px-4 py-3 rounded-md border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-blue-500`}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              className={`w-full px-4 py-3 rounded-md border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-blue-500`}
              placeholder="Phone"
              name="phone"
              value={user.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
          {/* Additional Fields */}
          <div className="mb-4">
            <input
              type="text"
              className={`w-full px-4 py-3 rounded-md border ${
                errors.address ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-blue-500`}
              placeholder="Address"
              name="address"
              value={user.address}
              onChange={handleChange}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              className={`w-full px-4 py-3 rounded-md border ${
                errors.city ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-blue-500`}
              placeholder="City"
              name="city"
              value={user.city}
              onChange={handleChange}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              className={`w-full px-4 py-3 rounded-md border ${
                errors.state ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-blue-500`}
              placeholder="State"
              name="state"
              value={user.state}
              onChange={handleChange}
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              className={`w-full px-4 py-3 rounded-md border ${
                errors.zipcode ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-blue-500`}
              placeholder="Zip Code"
              name="zipcode"
              value={user.zipcode}
              onChange={handleChange}
            />
            {errors.zipcode && (
              <p className="text-red-500 text-sm mt-1">{errors.zipcode}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              className={`w-full px-4 py-3 rounded-md border ${
                errors.ssn ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-blue-500`}
              placeholder="SSN"
              name="ssn"
              value={user.ssn}
              onChange={handleChange}
            />
            {errors.ssn && (
              <p className="text-red-500 text-sm mt-1">{errors.ssn}</p>
            )}
          </div>
          <Button
            variant="primary"
            className="w-full py-3 rounded-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white"
            type="submit"
          >
            Register
          </Button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default DonorRegister;
