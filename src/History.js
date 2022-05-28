import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { useContext } from "react";
import PercentageContext from "./contexts/PercentageContext";
import UserContext from "./contexts/UserContext";

export default function History() {
  const { userInfo } = useContext(UserContext);
  const { percentage } = useContext(PercentageContext);
  const { dayHabits } = useContext(PercentageContext);

  return (
    <>
      <Header>
        TrackIt
        <img src={userInfo.image} alt={userInfo.name} />
      </Header>
      <HistoryStyled>
        <h1>Histórico</h1>
        <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
      </HistoryStyled>
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
const HistoryStyled = styled.div`
  padding: 0 4%;
  margin-top: 120px;
  height: 100vh;
  h1 {
    font-size: 24px;
    color: #126ba5;
    margin-bottom: 9px;
  }
  p {
    font-size: 18px;
    color: #666;
  }
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
