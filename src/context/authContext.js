import React, { useState, createContext } from "react";
import {message} from 'antd';
import { reqLogin} from "../api/index";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState("");

  //Function to put JWT token in local storage.
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  }

  const authenticate = async (username, password) => {
    const result = await reqLogin(username, password);
    if (result.token) {
      setToken(result.token)
      setIsAuthenticated(true);
      setUserName(username);
    }else {
      message.error(`Login failed!`);
    }
  };


  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        userName,
        authToken
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;