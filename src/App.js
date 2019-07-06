import React from "react";
import styled from "styled-components";

import { GameContainer } from "./container";

const CenterDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
function App() {
  return (
    <CenterDiv>
      <GameContainer />
    </CenterDiv>
  );
}

export default App;
