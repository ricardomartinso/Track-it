import React from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import GlobalStyle from "./GlobalStyle";
import UserContext from "./LoginPage";
import { useState } from "react/cjs/react.production.min";

export default function App() {
  const [userLogin, setUserLogin] = useState([]);
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Container>
        <Routes>
          <UserContext.Provider value={{ userLogin, setUserLogin }}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/cadastro" element={<RegisterPage />} />
          </UserContext.Provider>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 100vh;
  margin: 0 auto;

  background-color: #ccc;
  font-family: "Lexend Deca", sans-serif;
`;
