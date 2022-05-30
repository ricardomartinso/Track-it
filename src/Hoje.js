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
import PercentageContext from "./contexts/PercentageContext";

export default function Hoje() {
  const dayjs = require("dayjs");
  const { percentage } = useContext(PercentageContext);
  const { setPercentage } = useContext(PercentageContext);
  const { dayHabits } = useContext(PercentageContext);
  const { setDayHabits } = useContext(PercentageContext);

  const { userInfo } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const [habits, setHabits] = useState([]);
  const [currentSequence, setCurrentSequence] = useState(0);
  const [highestSequence, setHighestSequence] = useState(0);

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
      setDayHabits([...response.data]);
      setPercentage([
        ...response.data
          .filter((habit) => habit.done === true)
          .map((habit) => habit.id),
      ]);
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
        {percentage.length >= 1 ? (
          <HabitsConcluded color={"#8FC549"}>
            {((percentage.length / dayHabits.length) * 100).toFixed(0)}% dos
            hábitos concluídos
          </HabitsConcluded>
        ) : (
          <HabitsConcluded color={"#bababa"}>
            Nenhum hábito concluído ainda
          </HabitsConcluded>
        )}
      </Day>
      <Habits>
        {habits.map((habit) => {
          return (
            <Habit
              habit={habit}
              token={token}
              key={habit.id}
              percentage={percentage}
              setPercentage={setPercentage}
              currentSequence={currentSequence}
              setCurrenceSequence={setCurrentSequence}
              highestSequence={highestSequence}
              setHighestSequence={setHighestSequence}
            />
          );
        })}
      </Habits>

      <Menu>
        <LinkStyled to="/habitos">Hábitos</LinkStyled>
        <LinkStyled to="/hoje">
          <ProgressBar style={{ width: 91, height: 91 }}>
            <CircularProgressbarWithChildren
              value={(percentage.length / dayHabits.length) * 100}
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
function Habit({ habit, token, percentage, setPercentage }) {
  const [checkedColor, setCheckedColor] = useState(habit.done);
  const [isMarked, setIsMarked] = useState(habit.done);
  const [currentSequence, setCurrentSequence] = useState(habit.currentSequence);
  const [highestSequence, setHighestSequence] = useState(habit.highestSequence);
  const [comparedColor, setComparedColor] = useState(false);

  function markAsDoneHabit() {
    let current = currentSequence;
    let highest = highestSequence;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const promise = axios.post(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/check`,
      "",
      config
    );
    promise.then((response) => {
      current = current + 1;
      highest = highest + 1;
      setIsMarked(true);
      setCheckedColor(true);
      setHighestSequence(current);
      setCurrentSequence(highest);
      compareSequence();
      addArray(habit.id);
    });
    promise.catch((response) => console.log(response.data));
  }

  function desmarkAsDoneHabit() {
    let current = currentSequence;
    let highest = highestSequence;

    const config = { headers: { Authorization: `Bearer ${token}` } };
    const promise = axios.post(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/uncheck`,
      "",
      config
    );
    promise.then((response) => {
      current = current - 1;
      highest = highest - 1;
      setIsMarked(false);
      setCheckedColor(false);
      setComparedColor(false);
      setCurrentSequence(current);
      setHighestSequence(highest);
      if (current === 1 && highest === 1) {
        compareSequence();
      }
      removeRepeated(habit.id);
    });

    promise.catch((response) => console.log(response.data));
  }

  function compareSequence() {
    if (currentSequence === highestSequence) {
      setComparedColor(true);
      setCheckedColor(true);
    }
  }
  function addArray(id) {
    setPercentage([...percentage, id]);
    removeRepeated(id);
  }
  function removeRepeated(id) {
    const arrayContext = [...percentage];

    if (arrayContext.includes(id)) {
      const removeRepeatedContext = arrayContext.filter(
        (idRepeated) => idRepeated !== id
      );
      setPercentage(removeRepeatedContext);
      return;
    }
  }
  useEffect(() => {
    if (currentSequence === 0 && highestSequence === 0) {
      return;
    } else {
      compareSequence();
    }
  }, []);

  return (
    <HabitStyled>
      <HabitInfo>
        <h1>{habit.name}</h1>
        <SequenceDays>
          Sequência atual:
          {currentSequence === 1 ? (
            <span className={`${checkedColor}`}>{currentSequence} dia </span>
          ) : (
            <span className={`${checkedColor}`}>{currentSequence} dias </span>
          )}
        </SequenceDays>
        <HighestSequence>
          Seu recorde:{" "}
          {highestSequence === 1 ? (
            <span className={`${comparedColor}`}>{highestSequence} dia </span>
          ) : (
            <span className={`${comparedColor}`}>{highestSequence} dias </span>
          )}
        </HighestSequence>
      </HabitInfo>
      <Check
        color={isMarked ? "#8fc549" : "#e7e7e7"}
        onClick={() => {
          if (isMarked === true) {
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
  z-index: 1;
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
  justify-content: flex-start;
  flex-direction: column;
  font-family: "Lexend Deca", sans-serif;
  font-weight: 400;
  width: 100%;
  min-height: 100vh;
  padding: 0 4%;
  margin-bottom: 120px;
`;
const HabitStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  max-height: 94px;
  margin-top: 25px;
  background-color: #fff;
  border-radius: 8px;
  border: none;
  padding: 14px;
`;
const HabitInfo = styled.div`
  color: #666;

  h1 {
    font-size: 20px;
    margin-bottom: 7px;
  }

  &::first-letter {
    text-transform: uppercase;
  }
`;
const SequenceDays = styled.div`
  font-size: 13px;

  .true {
    margin-left: 5px;
    color: #8fc549;
  }
  .false {
    margin-left: 5px;
    color: #666;
  }
`;

const HighestSequence = styled.div`
  font-size: 13px;

  .true {
    margin-left: 5px;
    color: #8fc549;
  }
  .false {
    margin-left: 5px;
    color: #666;
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
  font-size: 18px;
  font-weight: 400;
  margin-top: 5px;
  text-transform: none;
  color: ${(props) => props.color};
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
