import React, { useState } from "react";
import { Button, Container, Form, Header, Message } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { primaryObj } from "../../utils/colors";
import api from "../../utils/api";

const Register = () => {
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

  const [touchedFields, setTouchedFields] = useState({});
  const [errors, setErrors] = useState({});

  const [alertMessage, setAlertMessage] = useState({
    message: "",
    type: "",
    show: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" });
    setTouchedFields({ ...touchedFields, [name]: true });
  };

  const showValidationMessages = ({ type, message, show }) => {
    setAlertMessage({
      type,
      message,
      show,
    });
    setTimeout(() => {
      setAlertMessage({
        type: "",
        message: "",
        show: false,
      });
    }, 1500);
  };

  const handleSubmit = async () => {
    setErrors({});

    let formIsValid = true;
    let finalErrors = {};

    // Validation rules
    const validationRules = {
      firstName: "First name is required",
      lastName: "Last name is required",
      email: "Email address is required",
      password: "Password is required",
      confirmPassword: "Please confirm your password",
      phone: "Phone number is required",
      address: "Address is required",
      city: "City is required",
      state: "State is required",
      zipcode: "Zip code is required",
      ssn: "Social security number is required",
    };

    // Check for empty fields
    for (const key in user) {
      if (!user[key]) {
        finalErrors = { ...finalErrors, [key]: validationRules[key] };
        formIsValid = false;
      }
    }

    // Check password match
    if (user.password !== user.confirmPassword) {
      finalErrors = {
        ...finalErrors,
        confirmPassword: "Passwords do not match",
      };
      formIsValid = false;
      showValidationMessages({
        type: "error",
        message: "Passwords do not match",
        show: true,
      });
      return;
    }

    // Update errors state
    if (!formIsValid) {
      setErrors({ allFields: "Please fill in all the fields" });
      showValidationMessages({
        type: "error",
        message: "Please fill in all the fields",
        show: true,
      });
    } else {
      setErrors({});
    }

    if (formIsValid) {
      try {
        // Make API call to register user
        await api.post("/users", { ...user, status: "Pending" });
        // Show success message and redirect to login page
        setAlertMessage({
          type: "success",
          message: "Registration successful",
          show: true,
        });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } catch (err) {
        const message = err?.response?.data.message;
        showValidationMessages({
          type: "error",
          message: message ? message : err?.message,
          show: true,
        });
        console.error(err);
      }
    }
  };

  return (
    <Container style={{ marginTop: "5em" }}>
      <Header
        as="h2"
        color="teal"
        style={{ marginBottom: 20 }}
        textAlign="center"
      >
        Create an account
      </Header>
      {/* Alert message */}
      {alertMessage.show && (
        <Message
          success={alertMessage.type === "success"}
          negative={alertMessage.type === "error"}
          header={alertMessage.message}
          style={{ marginBottom: "20px", marginLeft: 110, maxWidth: "70%" }}
        />
      )}
      <Form size="large" onSubmit={handleSubmit}>
        <div className="flex" style={{ marginLeft: 110 }}>
          <div style={{ flex: 1, marginRight: "10px", maxWidth: "40%" }}>
            <Form.Input
              fluid
              placeholder="First Name"
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              error={Boolean(touchedFields.firstName && errors.firstName)}
            />
            {/* Last name */}
            <Form.Input
              fluid
              placeholder="Last Name"
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              error={Boolean(touchedFields.lastName && errors.lastName)}
            />
            {/* Email */}
            <Form.Input
              fluid
              placeholder="E-mail address"
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              error={Boolean(touchedFields.email && errors.email)}
            />
            {/* Password */}
            <Form.Input
              fluid
              placeholder="Password"
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              error={Boolean(touchedFields.password && errors.password)}
            />
            {/* Confirm Password */}
            <Form.Input
              fluid
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              error={Boolean(
                touchedFields.confirmPassword && errors.confirmPassword
              )}
            />
            {/* Phone */}
            <Form.Input
              fluid
              placeholder="Phone"
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              error={Boolean(touchedFields.phone && errors.phone)}
            />
          </div>
          <div style={{ flex: 1, marginLeft: "10px", maxWidth: "40%" }}>
            <Form.Input
              fluid
              placeholder="Address"
              type="text"
              name="address"
              value={user.address}
              onChange={handleChange}
              error={Boolean(touchedFields.address && errors.address)}
            />
            {/* City */}
            <Form.Input
              fluid
              placeholder="City"
              type="text"
              name="city"
              value={user.city}
              onChange={handleChange}
              error={Boolean(touchedFields.city && errors.city)}
            />
            {/* State */}
            <Form.Input
              fluid
              placeholder="State"
              type="text"
              name="state"
              value={user.state}
              onChange={handleChange}
              error={Boolean(touchedFields.state && errors.state)}
            />
            {/* Zip Code */}
            <Form.Input
              fluid
              placeholder="Zip Code"
              type="text"
              name="zipcode"
              value={user.zipcode}
              onChange={handleChange}
              error={Boolean(touchedFields.zipcode && errors.zipcode)}
            />
            {/* SSN */}
            <Form.Input
              fluid
              placeholder="SSN"
              type="text"
              name="ssn"
              value={user.ssn}
              onChange={handleChange}
              error={Boolean(touchedFields.ssn && errors.ssn)}
            />
          </div>
        </div>
        {/* Register button */}
        <Button
          color="teal"
          fluid
          size="large"
          type="submit"
          style={{
            ...primaryObj,
            width: "36%",
            marginTop: 20,
            marginLeft: 110,
          }}
        >
          Register
        </Button>
      </Form>
      {/* Login link */}
      <p
        className="text-center text-sm"
        style={{
          width: "37%",
          marginTop: 20,
          marginLeft: 110,
        }}
      >
        Already have an account?{" "}
        <a href="/login" className="text-teal-500">
          Log In
        </a>
      </p>
    </Container>
  );
};

export default Register;
