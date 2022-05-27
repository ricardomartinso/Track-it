import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { useContext } from "react";
import UserContext from "./contexts/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
import TokenContext from "./contexts/TokenContext";
import addHabit from "./assets/addHabit.png";
import plus from "./assets/+.png";
export default function Habits() {
  const { userInfo } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const promise = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      config
    );
    promise.then((response) => {
      setHabits([...response.data]);
    });
  }, []);

  return (
    <>
      <Header>
        TrackIt
        <img src={userInfo.image} alt={userInfo.name} />
      </Header>
      <HabitsStyled>
        <MyHabits>
          <h1>Meus Hábitos </h1>
          <AddHabit>
            <img src={addHabit} alt="Adicionar Hábito" />
            <div>
              <img src={plus} alt="" />
            </div>
          </AddHabit>
        </MyHabits>
        {habits.map((habit) => (
          <p> {habit.name} </p>
        ))}
      </HabitsStyled>
      <Menu>
        <LinkStyled to="/habitos">Hábitos</LinkStyled>
        <LinkStyled to="/hoje">
          <ProgressBar style={{ width: 91, height: 91 }}>
            <CircularProgressbarWithChildren
              value={66}
              circleRatio={1}
              background={true}
              backgroundPadding={8}
              styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                rotation: 1,

                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "round",

                // Text size

                textSize: "24px",
                textAlign: "center",

                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 0.5,

                // Can specify path transition in more detail, or remove it entirely
                // pathTransition: 'none',

                // Colors
                pathColor: `rgba(255, 255, 255)`,
                textColor: "#fff",
                trailColor: "#52B6FF",
                backgroundColor: "#52B6FF",
              })}
            >
              <p>Hoje</p>
            </CircularProgressbarWithChildren>
            ;
          </ProgressBar>
        </LinkStyled>
        <LinkStyled to="/historico">Histórico</LinkStyled>
      </Menu>
    </>
  );
}
const HabitsStyled = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  width: 100%;
  margin-top: 100px;
  padding: 0 4%;
  h1 {
    font-size: 23px;
    font-weight: 400;
    color: #126ba5;
  }
  p {
    font-size: 18px;
    color: #666;
  }
`;
const AddHabit = styled.div`
  position: relative;
  width: 40px;
  height: 35px;

  &:first-child {
    position: initial;
    width: 100%;
    height: 100%;
  }
  div {
    position: absolute;
    top: 29%;
    left: 31%;
  }
`;

const MyHabits = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
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
const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background-color: #fff;
  border-top: 1px solid #ccc;
`;
const ProgressBar = styled.div`
  position: relative;
  bottom: 20px;
  p {
    position: absolute;
    font-size: 18px;
    bottom: 47%;
    color: white;
  }
`;
const LinkStyled = styled(Link)`
  text-decoration: none;
  font-size: 20px;
  color: #52b6ff;
`;
