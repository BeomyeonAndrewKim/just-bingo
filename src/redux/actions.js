export const CHANGE_TURN = "CHANGE_TURN";

export const GET_BINGO_LINE = "GET_BINGO_LINE";

export const SET_GAME_STATUS = "SET_GAME_STATUS";

export const changeTurn = nextTurn => ({
  type: CHANGE_TURN,
  payload: {
    currentTurn: nextTurn
  }
});

export const getBingoLine = ({ bingoLine, player }) => ({
  type: GET_BINGO_LINE,
  payload: {
    bingoLine,
    player
  }
});

export const setGameStatus = gameStatus => ({
  type: SET_GAME_STATUS,
  payload: {
    gameStatus
  }
});
