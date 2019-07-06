const BINGO_SIZE = 5;

const LEFT_TO_RIGHT_CROSS = [],
  RIGHT_TO_LEFT_CROSS = [];
let startPointFromLeft = 1,
  startPoingFromRight = BINGO_SIZE;
for (let i = 1; i <= BINGO_SIZE; i++) {
  LEFT_TO_RIGHT_CROSS.push(startPointFromLeft);
  startPointFromLeft += BINGO_SIZE + 1;

  RIGHT_TO_LEFT_CROSS.push(startPoingFromRight);
  startPoingFromRight += BINGO_SIZE - 1;
}

export { BINGO_SIZE, LEFT_TO_RIGHT_CROSS, RIGHT_TO_LEFT_CROSS };
