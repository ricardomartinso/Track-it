import styled from "styled-components";
import imagem from "./assets/logo.png";
import { useNavigate, Link } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import TokenContext from "./contexts/TokenContext";
import UserContext from "./contexts/UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("ricardo@ricardo.com");
  const [password, setPassword] = useState("12345");
  const { setToken } = useContext(TokenContext);
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  function loginApp(event) {
    event.preventDefault();
    const userLogin = {
      email,
      password,
    };
    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
      userLogin
    );
    promise.then((response) => {
      setUserInfo({ ...response.data });
      setToken(response.data.token);
      navigate("/hoje", { replace: true });
    });
    promise.catch(() => alert("Usuário ou Senha inválidos"));
  }

  return (
    <LoginPageStyled>
      <img src={imagem} alt="" />
      <Form onSubmit={loginApp}>
        <Input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          value={email}
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="senha"
          id="senha"
          placeholder="Senha"
        />
        <Button type="submit">Entrar</Button>
      </Form>
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
  margin: 80px auto 0 auto;
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Input = styled.input`
  width: 303px;
  height: 45px;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  font-size: 20px;
  color: #dbdbdb;
  margin-top: 7px;

  &::placeholder {
    color: #dbdbdb;
    font-weight: bold;
  }
`;
const Button = styled.button`
  width: 303px;
  height: 45px;
  border: none;
  border-radius: 4.5px;
  background-color: #52b6ff;
  margin-top: 7px;
  margin-bottom: 16px;
  color: #fff;
  font-size: 20px;
`;
