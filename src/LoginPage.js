import styled from "styled-components";
import imagem from "./logo.png";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userLogin = {
      email,
      password,
    };
    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
      userLogin
    );
    promise.then((response) => {
      navigate("/habitos");
    });
  }, []);

  return (
    <LoginPageStyled>
      <img src={imagem} alt="" />
      <form>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          value={email}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="senha"
          id="senha"
          placeholder="Senha"
        />
        <button type="submit">Entrar</button>
      </form>
      <Link to="/cadastro">Não tem uma conta? Cadastre-se</Link>
    </LoginPageStyled>
  );
}
const LoginPageStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  form {
    display: flex;
    flex-direction: column;
  }
`;
