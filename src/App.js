import React from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Hoje from "./Hoje";
import GlobalStyle from "./GlobalStyle";
import TokenContext from "./contexts/TokenContext";
import UserContext from "./contexts/UserContext";
import { useState } from "react";

export default function App() {
  const [token, setToken] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      <TokenContext.Provider value={{ token, setToken }}>
        <BrowserRouter>
          <GlobalStyle />
          <Container>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/cadastro" element={<RegisterPage />} />
              <Route path="/hoje" element={<Hoje />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </TokenContext.Provider>
    </UserContext.Provider>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 100vh;
  margin: 0 auto;

  background-color: #f2f2f2;
  font-family: "Lexend Deca", sans-serif;
`;
