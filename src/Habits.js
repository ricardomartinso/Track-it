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
import PercentageContext from "./contexts/PercentageContext";
import dayjs from "dayjs/locale/pt-br";
import { ThreeDots } from "react-loader-spinner";

export default function Habits() {
  const { userInfo } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const { percentage } = useContext(PercentageContext);
  const { dayHabits } = useContext(PercentageContext);
  const [habitName, setHabitName] = useState("");
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
    }
    return;
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
        {toggleCreation ? (
          <CreateHabit
            token={token}
            setHabits={setHabits}
            habitName={habitName}
            setHabitName={setHabitName}
            habits={habits}
            setToggleCreation={setToggleCreation}
          />
        ) : (
          ""
        )}

        {habits.length >= 1 ? (
          habits.map((habit) => (
            <Habit
              habit={habit}
              token={token}
              setHabits={setHabits}
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

function Habit({ habit, token, setHabits }) {
  const days = ["S", "T", "Q", "Q", "S", "S", "D"];

  function generateHabits() {
    habit.days.map((id, index) => {
      days.map((day) => {
        if (index + 1 === id) {
          return (
            <Day background={"#cfcfcf"} color={"#fff"}>
              {day}
            </Day>
          );
        } else {
          return (
            <Day background={"#fff"} color={"#cfcfcf"}>
              {day}
            </Day>
          );
        }
      });
    });
  }
  const habitDays = generateHabits();

  function reloadHabits() {
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
  }
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
        reloadHabits();
        alert("Hábito deletado com sucesso!");
      });
    }
  }

  return (
    <HabitStyled>
      <DayName>{habit.name}</DayName>
      <Days>
        <Day array={habit.days} id={1}>
          S
        </Day>
        <Day array={habit.days} id={2}>
          T
        </Day>
        <Day array={habit.days} id={3}>
          Q
        </Day>
        <Day array={habit.days} id={4}>
          Q
        </Day>
        <Day array={habit.days} id={5}>
          S
        </Day>
        <Day array={habit.days} id={6}>
          S
        </Day>
        <Day array={habit.days} id={7}>
          D
        </Day>
      </Days>
      <img src={apagar} onClick={deleteHabit} />
    </HabitStyled>
  );
}
function CreateHabit({
  token,
  setHabits,
  habits,
  setToggleCreation,
  habitName,
  setHabitName,
}) {
  const [arrayDays, setArrayDays] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const habitCreated = {
      name: habitName,
      days: arrayDays.sort((a, b) => a - b),
    };

    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      habitCreated,
      config
    );
    promise.then((response) => {
      setHabits([...habits, response.data]);
      setIsLoading(false);
      setToggleCreation(false);
      console.log("Hábito criado com sucesso!");
    });
    promise.catch((r) => {
      setIsLoading(false);
      alert("Por favor preencha os campos corretamente");
    });
  }
  return (
    <CreateHabitStyled>
      <input
        type="text"
        placeholder="Nome do Hábito..."
        value={habitName}
        onChange={(e) => {
          setHabitName(e.target.value);
        }}
        disabled={isLoading}
      />
      <Days>
        <DayButton addDays={addDays} numberOfWeek={1} dayOfWeek={"S"} />
        <DayButton addDays={addDays} numberOfWeek={2} dayOfWeek={"T"} />
        <DayButton addDays={addDays} numberOfWeek={3} dayOfWeek={"Q"} />
        <DayButton addDays={addDays} numberOfWeek={4} dayOfWeek={"Q"} />
        <DayButton addDays={addDays} numberOfWeek={5} dayOfWeek={"S"} />
        <DayButton addDays={addDays} numberOfWeek={6} dayOfWeek={"S"} />
        <DayButton addDays={addDays} numberOfWeek={7} dayOfWeek={"D"} />
      </Days>
      <SaveCancel>
        <Cancel
          onClick={() => {
            setToggleCreation(false);
          }}
        >
          Cancelar
        </Cancel>
        {isLoading ? (
          <Save type="submit" onClick={createHabit}>
            <ThreeDots color="#FFFFFF" />
          </Save>
        ) : (
          <Save type="submit" onClick={createHabit}>
            Salvar
          </Save>
        )}
      </SaveCancel>
    </CreateHabitStyled>
  );
}
function DayButton({ addDays, numberOfWeek, dayOfWeek }) {
  const [background, setBackground] = useState("#fff");
  const [color, setColor] = useState("#dbdbdb");

  function changeColor() {
    if (background === "#fff") {
      setColor("#fff");
      setBackground("#CFCFCF");
    } else {
      setColor("#dbdbdb");
      setBackground("#fff");
    }
  }
  return (
    <DayButtonStyled
      background={background}
      color={color}
      onClick={() => {
        changeColor();
        addDays(numberOfWeek);
      }}
    >
      {dayOfWeek}
    </DayButtonStyled>
  );
}
const HabitsStyled = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  width: 100%;
  height: auto;
  margin-top: 100px;
  padding: 0 4%;
  margin-bottom: 100px;
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
  margin-bottom: 25px;
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
  background-color: ${({ array, id }) =>
    array.includes(id) ? "#cfcfcf" : "#fff"};
  color: ${({ array, id }) => (array.includes(id) ? "#fff" : "#cfcfcf")};
  font-size: 20px;
  border-radius: 5px;
  border: 1px solid #d4d4d4;
  margin-right: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const DayButtonStyled = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.background};
  color: ${(props) => props.color};
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
    &:disabled {
      background-color: #f0f0f0;
    }
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
  display: flex;
  align-items: center;
  justify-content: center;
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
  z-index: 1;
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
