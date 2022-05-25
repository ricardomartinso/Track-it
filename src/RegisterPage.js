import styled from "styled-components";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";
import logo from "./assets/logo.png";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function cadastro() {
    const userRegister = {
      email,
      name,
      image,
      password,
    };
    console.log(userRegister);
    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
      userRegister
    );
    promise.then((response) => {
      alert("cadastro finalizado");
      navigate("/");
    });
    promise.catch((err) =>
      alert("Falha no cadastro, por favor tente novamente!")
    );
  }

  return (
    <Register>
      <img src={logo} alt="" />
      <Form onSubmit={cadastro}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Foto"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <Button>Cadastrar</Button>
      </Form>
      <Link to="/">Já tem uma conta? Faça Login</Link>
    </Register>
  );
}

const Register = styled.div`
  width: 100%;
  margin: 80px auto 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
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
    padding-left: 7px;
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
