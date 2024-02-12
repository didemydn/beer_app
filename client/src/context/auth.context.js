// src/context/auth.context.js

import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Check if there is an authentication token in local storage
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      // If token exists, set isLoggedIn to true and fetch user data
      setIsLoggedIn(true);
      fetchUserData();
    } else {
      // If no token exists, set isLoading to false
      setIsLoading(false);
    }
  }, []);

  const fetchUserData = () => {
    // Fetch user data from the backend using the authentication token
    axios.get(`${API_URL}/user`)
      .then(response => {
        setUser(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      });
  };

  const login = (email, password) => {
    // Implement login functionality (send login request to backend)
    return axios.post(`${API_URL}/login`, { email, password })
      .then(response => {
        const token = response.data.token;
        storeToken(token);
        setIsLoggedIn(true);
        fetchUserData();
        return response.data; // Optionally return any data from the backend
      })
      .catch(error => {
        console.error("Error logging in:", error);
        throw error; // Rethrow the error to handle it in the component
      });
  };

  const logout = () => {
    // Implement logout functionality (clear authentication token)
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setUser(null);
  };

  const storeToken = (token) => {
    // Store the authentication token in local storage
    localStorage.setItem('authToken', token);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
