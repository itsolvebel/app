"use client";
import "@styles/globals.css";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    loading: true,
    isLogged: false,
    id: null,
    email: null,
    first_name: null,
    last_name: null,
    roles: null,
    categories: null,
    created_at: null,
    avatar: null,
  });

  const logout = () => {
    setAuth({
      loading: true,
      isLogged: false,
      id: null,
      email: null,
      first_name: null,
      last_name: null,
      roles: null,
      categories: null,
      created_at: null,
      avatar: null,
    });
    window.location.href = "/login";
  };

  const fetchUserData = async () => {
      fetch("http://localhost:3001/api/v1/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setAuth({
            loading: false,
            isLogged: true,
            id: data.data.id ? data.data.id : null,
            email: data.data.email ? data.data.email : null,
            first_name: data.data.first_name ? data.data.first_name : null,
            last_name: data.data.last_name ? data.data.last_name : null,
            roles: data.data.roles ? data.data.roles : null,
            categories: data.data.categories ? data.data.categories : null,
            created_at: data.data.created_at ? data.data.created_at : null,
            avatar: data.data.avatar ? data.data.avatar : null,
          });
        });

    if (auth.loading) {
      setAuth({
        loading: false,
        isLogged: false,
        id: null,
        firstName: null,
        lastName: null,
        avatar: null,
        email: null,
        role: null,
      });
    }
  };

  const setData = (data) => {
    setAuth(data);
  };

  useEffect(() => {
    if (!auth.isLogged) {
      fetchUserData();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
