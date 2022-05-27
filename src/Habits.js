import apagar from "./assets/apagar.png";
import plus from "./assets/+.png";
import addHabit from "./assets/addHabit.png";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { useContext } from "react";
import UserContext from "./contexts/UserContext";
import TokenContext from "./contexts/TokenContext";
import dayjs from "dayjs/locale/pt-br";

export default function Habits() {
  const { userInfo } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const [habits, setHabits] = useState([]);
  const [toggleCreation, setToggleCreation] = useState(false);
  const dayjs = require("dayjs");
  const weekday = require("dayjs/plugin/weekday");

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
  function openOrCloseHabit() {
    if (toggleCreation === false) {
      setToggleCreation(true);
    } else {
      setToggleCreation(false);
    }
  }
  return (
    <>
      <Header>
        TrackIt
        <img src={userInfo.image} alt={userInfo.name} />
      </Header>

      <HabitsStyled>
        <MyHabits>
          <h1>Meus Hábitos </h1>
          <AddHabit onClick={openOrCloseHabit}>
            <img src={addHabit} alt="Adicionar Hábito" />
            <div>
              <img src={plus} alt="" />
            </div>
          </AddHabit>
        </MyHabits>
        {toggleCreation ? <CreateHabit token={token} /> : ""}

        {habits.length >= 1 ? (
          habits.map((habit) => (
            <Habit
              habit={habit}
              token={token}
              dayjs={dayjs}
              weekday={weekday}
              key={habit.id}
            ></Habit>
          ))
        ) : (
          <p>
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
            começar a trackear!
          </p>
        )}
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

function Habit({ habit, token }) {
  function deleteHabit() {
    if (window.confirm("Deseja mesmo deletar o seu hábito?") === true) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const promise = axios.delete(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}`,
        config
      );
      promise.then((r) => {
        alert("Hábito deletado com sucesso!");
      });
    }
  }

  return (
    <HabitStyled>
      <DayName>{habit.name}</DayName>
      <Days>
        {habit.days.map((day) => {
          if (day === 1) {
            return <Day>S</Day>;
          } else if (day === 2) {
            return <Day>T</Day>;
          } else if (day === 3) {
            return <Day>Q</Day>;
          } else if (day === 4) {
            return <Day>Q</Day>;
          } else if (day === 5) {
            return <Day>S</Day>;
          } else if (day === 6) {
            return <Day>S</Day>;
          } else if (day === 7) {
            return <Day>D</Day>;
          }
        })}
      </Days>
      <img src={apagar} onClick={deleteHabit} />
    </HabitStyled>
  );
}
function CreateHabit({ token }) {
  const [habitName, setHabitName] = useState("");
  const [arrayDays, setArrayDays] = useState([]);
  function removeRepeatedDays(id) {
    const arrays = [...arrayDays];
    if (arrays.includes(id)) {
      const removeRepeated = arrays.filter((idRepeated) => idRepeated !== id);
      setArrayDays(removeRepeated);
      return;
    }
  }
  function addDays(id) {
    setArrayDays([...arrayDays, id]);
    removeRepeatedDays(id);
  }
  function createHabit() {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const habitCreated = {
      name: habitName,
      days: [1, 2, 5],
    };
    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      habitCreated,
      config
    );
    promise.then((r) => alert("Hábito criado com sucesso!"));
  }
  return (
    <CreateHabitStyled>
      <input
        type="text"
        placeholder="Nome do Hábito"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
      />
      <Days>
        <DayButton addDays={addDays} />
      </Days>
      <SaveCancel>
        <Cancel>Cancelar</Cancel>
        <Save onClick={createHabit}>Salvar</Save>
      </SaveCancel>
    </CreateHabitStyled>
  );
}
function DayButton({ addDays }) {
  const [background, setBackground] = useState("#fff");
  function changeColor() {
    if (background === "#fff") {
      setBackground("#666");
    } else {
      setBackground("#fff");
    }
  }
  return (
    <>
      <Day
        background={background}
        onClick={() => {
          changeColor();
          addDays(1);
        }}
      >
        S
      </Day>
      <Day
        background={background}
        onClick={() => {
          changeColor();
          addDays(2);
        }}
      >
        T
      </Day>
      <Day
        background={background}
        onClick={() => {
          changeColor();
          addDays(3);
        }}
      >
        Q
      </Day>
      <Day
        background={background}
        onClick={() => {
          changeColor();
          addDays(4);
        }}
      >
        Q
      </Day>
      <Day
        background={background}
        onClick={() => {
          changeColor();
          addDays(5);
        }}
      >
        S
      </Day>
      <Day
        background={background}
        onClick={() => {
          changeColor();
          addDays(6);
        }}
      >
        S
      </Day>
      <Day
        background={background}
        onClick={() => {
          changeColor();
          addDays(7);
        }}
      >
        D
      </Day>
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
const HabitStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: 91px;
  margin-top: 25px;
  padding: 15px;
  background-color: #fff;
  position: relative;
  img {
    cursor: pointer;
    width: 15px;
    height: 15px;
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;
const Days = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Day = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.background};
  color: #dbdbdb;
  font-size: 20px;
  border-radius: 5px;
  border: 1px solid #d4d4d4;
  margin-right: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const DayName = styled.p`
  font-size: 20px;
  color: #666666;
  font-weight: 400;
  &::first-letter {
    text-transform: uppercase;
  }
`;
const CreateHabitStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  width: 100%;
  background-color: #fff;
  height: 180px;
  margin: 25px 0;
  padding: 14px;
  input {
    width: 303px;
    height: 45px;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    background-color: #fff;
    color: #dbdbdb;
    font-size: 20px;
    padding-left: 10px;
    &::placeholder {
      color: #dbdbdb;
      font-size: 20px;
    }
  }
`;
const SaveCancel = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  Link {
    color: blue;
    margin-right: 15px;
  }
`;
const Save = styled.button`
  width: 84px;
  height: 35px;
  margin-left: 15px;
  background-color: #52b6ff;
  font-size: 20px;
  text-align: center;
  color: white;
  border: none;
  border-radius: 5px;
`;
const Cancel = styled.div`
  color: #52b6ff;
  font-size: 20px;
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
//
//
//
//
//
// width: 340px
// height: 91px;
// background-color: #fff
// position: relative;
//
// <div className="">{habit.name}</div>
// <div className="">{habit.days.map(day => day)}</div>
// <img src={apagar}/>
//
//
//
//
//
//
