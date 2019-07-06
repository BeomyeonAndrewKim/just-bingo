import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";

import { BingoBox, BingoList, StartBtn } from "../component";
import { changeTurn, getBingoLine, setGameStatus } from "../redux/actions";
import { BINGO_SIZE, LEFT_TO_RIGHT_CROSS, RIGHT_TO_LEFT_CROSS } from "../const";

const InlineDiv = styled.div`
  display: inline-block;
  margin: 1rem;
`;

const CenterDiv = styled.div`
  width: 100%;
  margin: 0 auto;
`;

class GameContainer extends Component {
  state = {
    selectedA: [],
    selectedB: []
  };

  onClickBingoElement = ({ target: curEl }) => {
    if (curEl.classList.contains("clicked")) return;
    curEl.classList.add("clicked");

    const { currentTurn } = this.props;
    const nextTurn = currentTurn === "A" ? "B" : "A",
      counterField = Array.from(this[`elPlayer${nextTurn}`].children);

    let counterEl;
    counterField.some(el => {
      if (el.innerText === curEl.innerText) {
        el.classList.add("clicked");
        counterEl = el;
      }
      return el.innerText === curEl.innerText;
    });

    const [A, B] = currentTurn === "A" ? [curEl, counterEl] : [counterEl, curEl];
    this.verifyBingo({ A, B });

    this.props.changeTurn(nextTurn);
  };

  verifyBingo = async ({ A, B }) => {
    const { id: aId } = A.dataset,
      { id: bId } = B.dataset,
      aVal = A.innerText,
      bVal = B.innerText;

    const newSelectedA = { id: +aId, val: +aVal },
      newSelectedB = { id: +bId, val: +bVal };
    await this.updateSelectedArray({ newSelectedA, newSelectedB });

    const { selectedA, selectedB } = this.state,
      arrayForCheck = [{ id: aId, selected: selectedA, player: "A" }, { id: bId, selected: selectedB, player: "B" }];
    this.crossCheck(arrayForCheck);
    this.verticalHorizontalCheck(arrayForCheck);

    this.checkResult();
  };

  updateSelectedArray = ({ newSelectedA, newSelectedB }) => {
    this.setState(prevState => ({
      selectedA: [...prevState.selectedA, newSelectedA],
      selectedB: [...prevState.selectedB, newSelectedB]
    }));
  };

  crossCheck = arrayForCheck => {
    arrayForCheck.forEach(el => {
      if (LEFT_TO_RIGHT_CROSS.indexOf(+el.id) > -1) {
        const filteredArray = el.selected.filter(el => LEFT_TO_RIGHT_CROSS.find(aEl => aEl === el.id));
        if (filteredArray.length === BINGO_SIZE) {
          this.props.getBingoLine({
            player: el.player,
            bingoLine: filteredArray.sort((a, b) => a.id - b.id).map(el => el.val)
          });
        }
      }

      if (RIGHT_TO_LEFT_CROSS.indexOf(+el.id) > -1) {
        const filteredArray = el.selected.filter(el => RIGHT_TO_LEFT_CROSS.find(aEl => aEl === el.id));
        if (filteredArray.length === BINGO_SIZE) {
          this.props.getBingoLine({
            player: el.player,
            bingoLine: filteredArray.sort((a, b) => b.id - a.id).map(el => el.val)
          });
        }
      }
    });
  };

  verticalHorizontalCheck = arrayForCheck => {
    arrayForCheck.forEach(el => {
      const verticalCheck = el.id % BINGO_SIZE,
        verticalFilteredArray = el.selected.filter(el => el.id % BINGO_SIZE === verticalCheck);
      if (verticalFilteredArray.length === BINGO_SIZE) {
        this.props.getBingoLine({
          player: el.player,
          bingoLine: verticalFilteredArray.sort((a, b) => a.id - b.id).map(el => el.val)
        });
      }

      const horizontalCheck = Math.ceil(el.id / BINGO_SIZE),
        horizontalFilteredArray = el.selected.filter(el => Math.ceil(el.id / BINGO_SIZE) === horizontalCheck);
      if (horizontalFilteredArray.length === BINGO_SIZE) {
        this.props.getBingoLine({
          player: el.player,
          bingoLine: horizontalFilteredArray.sort((a, b) => a.id - b.id).map(el => el.val)
        });
      }
    });
  };

  checkResult = () => {
    const { bingoA, bingoB } = this.props;
    if (bingoA.length === BINGO_SIZE && bingoB.length === BINGO_SIZE) {
      window.confirm("무승부입니다.") && this.letGameFinished();
    } else if (bingoA.length === BINGO_SIZE) {
      window.confirm("1P가 빙고를 완성했습니다.") && this.letGameFinished();
    } else if (bingoB.length === BINGO_SIZE) {
      window.confirm("2P가 빙고를 완성했습니다.") && this.letGameFinished();
    }
  };

  letGameFinished = () => {
    this.props.setGameStatus("finished");
    this.setState({ selectedA: [], selectedB: [] });
  };

  onClickStartBtn = () => {
    this.props.setGameStatus("started");
    document.querySelectorAll(".clicked").forEach(el => el.classList.remove("clicked"));
    this.setState({ selectedA: [], selectedB: [] });
  };

  render() {
    return (
      <Fragment>
        <CenterDiv>
          <InlineDiv>
            <BingoBox
              ref={aRef => (this.elPlayerA = aRef)}
              player={"A"}
              onClickBingoElement={this.onClickBingoElement}
            />
            <BingoList player={"A"} />
          </InlineDiv>
          <InlineDiv>
            <BingoBox
              ref={bRef => (this.elPlayerB = bRef)}
              player={"B"}
              onClickBingoElement={this.onClickBingoElement}
            />
            <BingoList player={"B"} />
          </InlineDiv>
        </CenterDiv>
        <StartBtn onClickStartBtn={this.onClickStartBtn} />
      </Fragment>
    );
  }
}

export default connect(
  state => ({ currentTurn: state.currentTurn, bingoA: state.bingoA, bingoB: state.bingoB }),
  dispatch => bindActionCreators({ setGameStatus, changeTurn, getBingoLine }, dispatch)
)(GameContainer);
