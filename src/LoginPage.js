import styled from "styled-components";
import imagem from "./assets/logo.png";
import { useNavigate, Link } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import TokenContext from "./contexts/TokenContext";
import UserContext from "./contexts/UserContext";
import { ThreeDots } from "react-loader-spinner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(TokenContext);
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  function loginApp(event) {
    event.preventDefault();
    const userLogin = {
      email,
      password,
    };
    setIsLoading(true);
    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
      userLogin
    );
    promise.then((response) => {
      setUserInfo({ ...response.data });
      setToken(response.data.token);
      navigate("/hoje", { replace: true });
    });

    promise.catch(() => {
      setIsLoading(false);
      alert("Usuário ou Senha inválidos");
    });
  }

  return (
    <LoginPageStyled>
      <Form
        loginApp={loginApp}
        setEmail={setEmail}
        email={email}
        password={password}
        setPassword={setPassword}
        isLoading={isLoading}
      />
    </LoginPageStyled>
  );
}

function Form({ loginApp, setEmail, email, password, setPassword, isLoading }) {
  return (
    <>
      <img src={imagem} alt="" />
      <FormStyled onSubmit={loginApp}>
        <Input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          value={email}
          disabled={isLoading}
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="senha"
          id="senha"
          placeholder="Senha"
          disabled={isLoading}
        />
        {isLoading ? (
          <Button type="submit" disabled={true}>
            <ThreeDots color="#FFFFFF" />
          </Button>
        ) : (
          <Button type="submit">Entrar</Button>
        )}
      </FormStyled>
      <Link to="/cadastro">Não tem uma conta? Cadastre-se</Link>
    </>
  );
}

const LoginPageStyled = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin: 80px auto 0 auto;
  height: 100vh;
`;
const FormStyled = styled.form`
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 303px;
  height: 45px;
  border: none;
  border-radius: 4.5px;
  background-color: #52b6ff;
  margin-top: 7px;
  margin-bottom: 16px;
  color: #fff;
  font-size: 20px;
  &:disabled {
    background-color: rgba(82, 182, 255, 0.7);
  }
`;
