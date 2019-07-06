import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const StyledBtn = styled.button`
  width: 100%;
  text-align: center;
  margin: 0 auto;
`;

const StartBtn = ({ onClickStartBtn, gameStatus }) => {
  return <StyledBtn onClick={onClickStartBtn}>{gameStatus === "started" ? "게임 재시작" : "게임 시작"}</StyledBtn>;
};

export default connect(state => ({
  gameStatus: state.gameStatus
}))(StartBtn);
