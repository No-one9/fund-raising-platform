import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { useAuth } from "../../contexts/AuthContext";
import { primaryObj } from "../../utils/colors";

const CustomMenuItem = ({ children, to }) => (
  <Link to={to} style={{ color: "inherit", textDecoration: "none" }}>
    <div
      style={{
        padding: 9,
        fontSize: 14,
      }}
    >
      {children}
    </div>
  </Link>
);

const Header = () => {
  const { isAuthenticated, isAdmin, isUser, isDonor } = useAuth();
  const navigate = useNavigate();

  return (
    <Menu fixed="top" inverted style={{ ...primaryObj }}>
      <div
        onClick={() => navigate("/")}
        header
        style={{
          padding: 3,
          marginRight: "auto",
          marginLeft: 30,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          height: 75,
        }}
      >
        <div
          style={{
            padding: 10,
            fontSize: 20,
            cursor: "pointer", // Change cursor on hover
          }}
        >
          <strong>Fund Raising Platform</strong>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginRight: 150,
          fontSize: 14,
        }}
      >
        <>
          <CustomMenuItem to="/campaigns">Search Campaigns</CustomMenuItem>
        </>
        {isAuthenticated() ? (
          <>
            {isAdmin() && (
              <>
                <CustomMenuItem to="/admin/users">Users</CustomMenuItem>
                <CustomMenuItem to="/admin/donors">Donors</CustomMenuItem>
              </>
            )}

            {isUser() && (
              <>
                <CustomMenuItem to="/user/campaigns">
                  User Campaigns
                </CustomMenuItem>
              </>
            )}

            {isDonor() && (
              <>
                <CustomMenuItem to="/donor/donations">Donations</CustomMenuItem>
              </>
            )}

            <CustomMenuItem to="/logout">Logout</CustomMenuItem>
          </>
        ) : (
          <>
            <CustomMenuItem as={Link} to="/login">
              Login
            </CustomMenuItem>
            <CustomMenuItem as={Link} to="/register">
              Register
            </CustomMenuItem>
          </>
        )}
      </div>
    </Menu>
  );
};

export default Header;
