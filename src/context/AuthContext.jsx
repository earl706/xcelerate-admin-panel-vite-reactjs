import React, { createContext, useEffect, useState } from "react";
import APIusers from "../services/apiUsers";
import APItournaments from "../services/apiTournaments";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const login = async (full_name, password) => {
    try {
      const login_response = await APIusers.post("login-admin/", {
        full_name,
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
      const register_response = await APIusers.post("register/", data);
      return register_response;
    } catch (error) {
      return error;
    }
  };

  const getUsers = async () => {
    try {
      const users = await APIusers.get(`all/`);
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

  const getTournaments = async () => {
    try {
      const response = APItournaments.get("tournaments/");
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
      const response = APIusers.post("token/refresh/", {
        refresh: token,
      });
      return response;
    } catch (error) {
      return error;
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

        refreshToken,

        getTournaments,
        getTournament,
        createTournament,
        deleteTournaments,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
