import shuffle from "lodash.shuffle";
export const makeShuffledArray = BINGO_SIZE => {
  const array = [];
  for (let i = 1; i <= BINGO_SIZE * BINGO_SIZE; i++) {
    array.push(i);
  }
  return shuffle(array);
};
