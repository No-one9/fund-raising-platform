import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../utils/api";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    // Reset errors
    setErrors({ email: "", password: "" });

    // Validation
    let formIsValid = true;
    const updatedErrors = {};

    if (!credentials.email) {
      updatedErrors.email = "Email is required";
      formIsValid = false;
    }

    if (!credentials.password) {
      updatedErrors.password = "Password is required";
      formIsValid = false;
    }

    if (!formIsValid) {
      setErrors(updatedErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/admins/login", credentials); // Assuming admin login endpoint
      const { token, id: userId, ...rest } = response?.data;
      login(token, { userId, ...rest });
      navigate("/admin/users"); // Redirect to admin dashboard
    } catch (error) {
      setLoading(false);
      setLoginError("Invalid email or password. Please try again."); // Update login error message
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-900">
          Admin Login
        </h2>
        {loginError && (
          <p className="text-red-500 text-sm mt-1 mb-4">{loginError}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500"
              placeholder="Email address"
              name="email"
              value={credentials.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <Button
            variant="primary"
            className="w-full py-3 rounded-lg font-semibold bg-purple-500 hover:bg-purple-600 text-white"
            type="submit"
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            <Link to="/user/login" className="text-blue-500">
              User login
            </Link>
            <Link
              to="/donor/login"
              style={{ marginLeft: 20 }}
              className="text-blue-500"
            >
              Donor login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
