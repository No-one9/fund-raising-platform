import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.js";
import Header from "./Header";

const layoutStyle = {
  display: "flex",
  flexDirection: "column", // Stack items vertically
};

const contentStyle = {
  flex: 1,
  paddingTop: 50, // Adjust the top margin based on your header's height,
  marginLeft: 128,
  backgroundColor: "#f4e9d8",
};

const contentStyleWithoutSidebar = {
  ...contentStyle,
  marginLeft: 0,
  backgroundColor: "#fefefe",
};

const paddingDesignStyle = {
  marginTop: "1em",
  paddingLeft: "100px",
  paddingRight: "100px",
};

const paddingDesign = [
  "/",
  "/login",
  "/user/login",
  "/admin/login",
  "/donor/login",
  "/register",
  "/donor/register",
];

const Layout = ({ children }) => {
  const location = useLocation(); // Get the current location
  const { isAdmin, isAuthenticated, isEmployee, isInstructor, user } =
    useAuth();

  const paddingStyle = paddingDesign.includes(location.pathname)
    ? {}
    : paddingDesignStyle;

  const style = { ...contentStyleWithoutSidebar, ...paddingStyle };

  return (
    <div style={layoutStyle}>
      <Header />
      <div style={style}>{children}</div>
    </div>
  );
};

export default Layout;
