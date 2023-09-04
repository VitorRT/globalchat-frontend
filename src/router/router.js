import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import ChatPage from "../pages/ChatPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import NoServerConnection from "../components/error/NoServerConnection";
import api from "../utils/api/api";
import ConnectionLoading from "../components/modal/connectionLoading";

export default function AppRoutes({ logged, setLogged, user }) {
  const [serverError, setServerError] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkServerStatus() {
      try {
        const response = await api.test();
        if (response.success) {
          setServerError(false);
          setLoading(false);
        } else {
          setServerError(true);
          setLoading(false);
          setMessageError(response.message);
        }
      } catch (error) {
        setServerError(true);
        setMessageError("O servidor está offline para manutenção.")
      }
    }

    checkServerStatus();
  }, []);

  if(loading) {
    return <ConnectionLoading />
  }

  if (serverError && !loading) {
    return <NoServerConnection message={messageError}/>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={logged ? <ChatPage setLogged={setLogged} user={user} /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={!logged ? <LoginPage setLogged={setLogged} /> : <Navigate to="/" />} />
        <Route path="/register" element={!logged ? <RegisterPage setLogged={setLogged} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
