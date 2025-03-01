import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (token, user) => {
    localStorage.setItem("token", token);
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const updateUser = (userData) => {
    setUser(userData);
  };

  const isAuthenticated = () => {
    return token !== null && token !== undefined;
  };

  const isAdmin = () => {
    return isAuthenticated() && user?.role === "ROLE_ADMIN";
  };

  const isUser = () => {
    return isAuthenticated() && user?.role === "ROLE_USER";
  };

  const isDonor = () => {
    return isAuthenticated() && user?.role === "ROLE_DONOR";
  };

  const getUser = async (userId, role) => {
    const urlMap = {
      ROLE_ADMIN: `/admins/${userId}`,
      ROLE_USER: `/users/${userId}`,
      ROLE_DONOR: `/donors/${userId}`,
    };
    try {
      const response = await api.get(urlMap[role]);
      const user = response.data;
      const userDetails = {
        ...user,
        userId:
          role === "ROLE_ADMIN"
            ? user.id
            : role === "ROLE_USER"
            ? user.id
            : role === "ROLE_DONOR"
            ? user.id
            : null,
      };
      return userDetails;
    } catch (error) {
      console.log(error);
    }
  };

  const setUserDetails = (userDetails) => {
    setUser(userDetails);
  };

  useEffect(() => {
    const onLoad = async () => {
      if (isAuthenticated()) {
        setIsLoading(true);
        const decodedToken = jwtDecode(token || localStorage.getItem("token"));
        const user = await getUser(decodedToken?.userId, decodedToken?.role);
        setUser({ ...user, role: decodedToken?.role });
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };
    onLoad();
    // eslint-disable-next-line
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        updateUser,
        isAuthenticated,
        isAdmin,
        isUser,
        isDonor,
        setUser: setUserDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
