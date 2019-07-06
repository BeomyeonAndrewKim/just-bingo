import * as types from "./actions";
import { makeShuffledArray } from "../util";
import { BINGO_SIZE } from "../const";

const initialState = {
  gameStatus: "finished",
  currentTurn: "A",
  fieldA: [],
  fieldB: [],
  bingoA: [],
  bingoB: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.CHANGE_TURN:
      const { currentTurn } = payload;
      return {
        ...state,
        currentTurn
      };
    case types.GET_BINGO_LINE:
      const { player, bingoLine } = payload;
      return {
        ...state,
        [`bingo${player}`]: [...state[`bingo${player}`], bingoLine]
      };
    case types.SET_GAME_STATUS:
      const { gameStatus } = payload;
      switch (gameStatus) {
        case "finished":
          return {
            ...initialState
          };
        case "started":
          return {
            ...initialState,
            gameStatus,
            fieldA: makeShuffledArray(BINGO_SIZE),
            fieldB: makeShuffledArray(BINGO_SIZE)
          };
        default:
          return {
            ...state
          };
      }
    default:
      return state;
  }
};
