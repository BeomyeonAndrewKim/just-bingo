import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const InlineDiv = styled.div`
  display: inline-block;
`;

const MarginSpan = styled.span`
  margin: 1rem;
`;

const BingoList = ({ player, bingoA, bingoB }) => {
  const renderBingoList = bingoList => {
    return bingoList.map((el, index) => {
      return (
        <div key={index}>
          {el.map((el, index) => (
            <MarginSpan key={index}>{el}</MarginSpan>
          ))}
        </div>
      );
    });
  };
  return <InlineDiv>{renderBingoList(player === "A" ? bingoA : bingoB)}</InlineDiv>;
};

export default connect(state => ({
  bingoA: state.bingoA,
  bingoB: state.bingoB
}))(BingoList);
