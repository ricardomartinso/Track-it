import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import UserContext from "./contexts/UserContext";
import styled from "styled-components";

export default function Hoje() {
  const { userInfo } = useContext(UserContext);
  return (
    <Header>
      TrackIt
      <img src={userInfo.image} alt={userInfo.name} />
    </Header>
  );
}

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  padding: 0 18px;
  background-color: #126ba5;
  color: #fff;
  font-size: 40px;
  font-family: "Playball", cursive;
  img {
    width: 51px;
    height: 51px;
    border-radius: 50%;
  }
`;
