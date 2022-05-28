import styled from "styled-components";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import logo from "./assets/logo.png";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function cadastro(event) {
    event.preventDefault();
    const userRegister = {
      email,
      name,
      image,
      password,
    };
    setIsLoading(true);
    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
      userRegister
    );
    promise.then((response) => {
      navigate("/", { replace: true });
      alert("cadastro finalizado");
    });
    promise.catch((err) => {
      setIsLoading(false);
      alert("Falha no cadastro, por favor tente novamente!");
    });
  }

  return (
    <Register>
      <Form
        isLoading={isLoading}
        name={name}
        email={email}
        password={password}
        image={image}
        setName={setName}
        setEmail={setEmail}
        setPassword={setPassword}
        setImage={setImage}
        cadastro={cadastro}
        disabled={isLoading}
      />
    </Register>
  );
}
function Form({
  cadastro,
  email,
  setEmail,
  password,
  setPassword,
  setName,
  name,
  image,
  setImage,
  isLoading,
  disabled,
}) {
  return (
    <>
      <img src={logo} alt="" />
      <FormStyled onSubmit={cadastro}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
        />
        <Input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
          required
        />
        <Input
          type="text"
          placeholder="Foto"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          disabled={isLoading}
          required
        />
        {isLoading ? (
          <Button type="submit">
            <ThreeDots color="#FFFFFF" />
          </Button>
        ) : (
          <Button type="submit">Cadastrar</Button>
        )}
      </FormStyled>
      <Link to="/">Já tem uma conta? Faça Login</Link>
    </>
  );
}
const Register = styled.div`
  width: 100%;
  margin: 80px auto 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
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
    padding-left: 7px;
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
`;
