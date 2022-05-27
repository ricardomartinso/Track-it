import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserContext from "./contexts/UserContext";
import styled from "styled-components";
import dayjs from "dayjs/locale/pt-br";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import TokenContext from "./contexts/TokenContext";
import setinha from "./assets/vector.png";

export default function Hoje() {
  const dayjs = require("dayjs");

  const { userInfo } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const [habits, setHabits] = useState([]);
  const [percentage, setPercentage] = useState([]);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const promise = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
      config
    );

    promise.then((response) => {
      setHabits([...response.data]);
      setPercentage([...response.data]);
    });
  }, []);
  return (
    <>
      <Header>
        TrackIt
        <img src={userInfo.image} alt={userInfo.name} />
      </Header>
      <Day>
        {dayjs().locale("pt-br").format("dddd, DD/MM")}
        <HabitsConcluded>{}</HabitsConcluded>
      </Day>
      <Habits>
        {habits.map((habit) => (
          <Habit habit={habit} token={token} key={habit.id} />
        ))}
      </Habits>

      <Menu>
        <LinkStyled to="/habitos">Hábitos</LinkStyled>
        <LinkStyled to="/hoje">
          <ProgressBar style={{ width: 91, height: 91 }}>
            <CircularProgressbarWithChildren
              value={percentage}
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
function Habit({ habit, token }) {
  const [checkedColor, setCheckedColor] = useState(habit.done);
  const [currentSequence, setCurrenceSequence] = useState(
    habit.currentSequence
  );
  const [highestSequence, setHighestSequence] = useState(habit.highestSequence);

  function markAsDoneHabit() {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const promise = axios.post(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/check`,
      "",
      config
    );
    promise.then((response) => {
      setCheckedColor(true);
      setHighestSequence(highestSequence + 1);
      setCurrenceSequence(currentSequence + 1);
    });
    promise.catch((response) => console.log(response.data));
  }
  function desmarkAsDoneHabit() {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const promise = axios.post(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/uncheck`,
      "",
      config
    );
    promise.then((response) => {
      setCheckedColor(false);
      setCurrenceSequence(currentSequence - 1);
      setHighestSequence(highestSequence - 1);
    });
    promise.catch((response) => console.log(response.data));
  }
  return (
    <HabitStyled>
      <HabitInfo>
        <h1>{habit.name}</h1>
        <p>Sequência atual: {currentSequence}</p>
        <p>Seu recorde: {highestSequence}</p>
      </HabitInfo>
      <Check
        color={checkedColor ? "#8fc549" : "#e7e7e7"}
        onClick={() => {
          if (checkedColor === true) {
            desmarkAsDoneHabit();
          } else {
            markAsDoneHabit();
          }
        }}
      >
        <img src={setinha} alt="Seta" />
      </Check>
    </HabitStyled>
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
  margin-bottom: 80px;
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
const Habits = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 0 4%;
`;
const HabitStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 94px;
  background-color: #fff;
  border-radius: 5px;
  border: none;
  margin-top: 10px;
  padding: 14px;
`;
const HabitInfo = styled.div`
  color: #666;

  h1 {
    font-size: 20px;
    margin-bottom: 7px;
  }
  p {
    font-size: 13px;
  }
  &::first-letter {
    text-transform: uppercase;
  }
`;
const Check = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 69px;
  height: 69px;
  border: 1px solid #e7e7e7;
  background-color: ${(props) => props.color};
`;
const HabitsConcluded = styled.div`
  color: #bababa;
  font-size: 18px;
  font-weight: 400;
  margin-top: 5px;
  text-transform: none;
  p {
    color: ${(props) => props.color};
  }
`;
const Day = styled.div`
  width: 100%;
  color: #126ba5;
  font-size: 23px;
  font-weight: 400;
  padding-left: 17px;
  margin-top: calc(70px + 28px);
  text-transform: lowercase;
  &::first-letter {
    text-transform: uppercase;
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
