import React, { createContext, useEffect, useState } from "react";
import APIusers from "../services/apiUsers";
import APItournaments from "../services/apiTournaments";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const login = async (full_name, password) => {
    try {
      const login_response = await APIauth.post("login-admin/", {
        full_name,
        password,
      });

      localStorage.setItem("adminExcelerateToken", login_response.data.access);
      localStorage.setItem(
        "adminExcelerateRefreshToken",
        login_response.data.refresh
      );
      return login_response;
    } catch (err) {
      return err;
    }
  };

  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
};
