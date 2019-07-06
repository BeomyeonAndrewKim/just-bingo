import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { BINGO_SIZE } from "../const";

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: ${({ bingoSize }) => `repeat(${bingoSize}, 50px)`};
  grid-template-rows: ${({ bingoSize }) => `repeat(${bingoSize}, 50px)`};
  background-color: ${({ gameStatus, currentTurn, player }) =>
    gameStatus === "started" && currentTurn === player ? "none" : "grey"};
  & > div {
    line-height: 50px;
    text-align: center;
    border: 1px solid #000;
    box-sizing: border-box;
    &.clicked {
      background-color: ${({ player }) => (player === "A" ? "blue" : "green")};
      color: #fff;
    }
  }
`;

const BingoBox = React.forwardRef(({ fieldA, fieldB, onClickBingoElement, currentTurn, player, gameStatus }, ref) => {
  const handleOnClick = ({ gameStatus, currentTurn, player, event }) => {
    if (gameStatus === "finished") return;
    if (currentTurn !== player) return alert("잘못된 차례입니다.");
    onClickBingoElement(event);
  };
  const renderBingo = bingoArray => {
    return bingoArray.map((element, index) => {
      return (
        <div
          data-id={index + 1}
          key={index + 1}
          onClick={event => handleOnClick({ gameStatus, currentTurn, player, event })}
        >
          {element}
        </div>
      );
    });
  };
  return (
    <GridDiv ref={ref} player={player} bingoSize={BINGO_SIZE} currentTurn={currentTurn} gameStatus={gameStatus}>
      {renderBingo(player === "A" ? fieldA : fieldB)}
    </GridDiv>
  );
});

export default connect(
  state => ({
    currentTurn: state.currentTurn,
    gameStatus: state.gameStatus,
    fieldA: state.fieldA,
    fieldB: state.fieldB
  }),
  null,
  null,
  { forwardRef: true }
)(BingoBox);
