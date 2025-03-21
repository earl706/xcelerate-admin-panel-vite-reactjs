import React, { createContext, useEffect, useState } from "react";
import APIusers from "../services/apiUsers";
import APItournaments from "../services/apiTournaments";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const login = async (email, password) => {
    try {
      const login_response = await APIusers.post("login-admin/", {
        email,
        password,
      });
      console.log(login);

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

  const register = async (data) => {
    try {
      // const register_response = await APIusers.post("register/", data);
      const register_response = await APIusers.post("auth/users/", data);
      return register_response;
    } catch (error) {
      return error;
    }
  };

  const getUsers = async (params) => {
    try {
      const users = await APIusers.get(`all/?${params.toString()}`);
      return users;
    } catch (err) {
      return err;
    }
  };
  const getUser = async (id) => {
    try {
      const user = await APIusers.get(`detail/${id}/`);
      return user;
    } catch (err) {
      return err;
    }
  };

  const updateUser = async (data) => {
    try {
      const response = await APIusers.put(`detail/${data.id}/`, data);
      return response;
    } catch (err) {
      return err;
    }
  };

  const deleteUsers = async (data) => {
    try {
      const response = APIusers.post("batch-delete/", data);
      return response;
    } catch (error) {
      return error;
    }
  };

  const getTournaments = async (params) => {
    try {
      const response = await APItournaments.get(
        `tournaments/?${params.toString()}`
      );
      return response;
    } catch (err) {
      return err;
    }
  };

  const getTournament = async (id) => {
    try {
      const response = APItournaments.get(`tournaments/${id}/`);
      return response;
    } catch (err) {
      return err;
    }
  };

  const createTournament = async (data) => {
    try {
      const response = APItournaments.post("tournaments/", data);
      return response;
    } catch (err) {
      return err;
    }
  };

  const deleteTournaments = async (data) => {
    try {
      const response = APItournaments.post("batch-delete/", data);
      return response;
    } catch (error) {
      return error;
    }
  };

  const refreshToken = async (token) => {
    try {
      const response = await APIusers.post("token/refresh/", {
        refresh: token,
      });
      console.log(response);
      return response;
    } catch (error) {
      return error;
    }
  };

  const getAdminSummary = async () => {
    try {
      const response = await APIusers.get("admin-summary/");
      return response;
    } catch (err) {
      return err;
    }
  };

  const activateUser = async (uId, token) => {
    try {
      const response = await APIusers.get(`auth/activate/${uId}/${token}/`);
      return response;
    } catch (err) {
      return err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        getUsers,
        getUser,
        updateUser,
        deleteUsers,
        activateUser,

        refreshToken,

        getTournaments,
        getTournament,
        createTournament,
        deleteTournaments,

        getAdminSummary,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
