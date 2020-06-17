import React, { Component } from 'react';
import Board from './Board/Board';
import ScoreBoard from './ScoreBoard/ScoreBoard';
import './App.css';
import WinLogic from './WinLogic';
import AISpinner from './AI/AISpinner';
import { AI, EasyAI } from './AI/AI';

class App extends Component {
  winLogic = new WinLogic();

  state = {
    board: [  // board is in column, row format so that columns can be more easily represented
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    turn: 1,
    winner: 0,
    ai: AI.getInstance(AI.EASY),
    thinking: false
  }

  dropTokenHandler = (colIndex) => {
    console.info(`${this.state.turn}'s turn`);
    if(this.state.winner > 0) {
      return;
    }
    const localBoard = [...this.state.board];
    for(let i = localBoard[colIndex].length; i >= 0; --i) {
      if(localBoard[colIndex][i] === 0) { 
        localBoard[colIndex][i] = this.state.turn;
        break;
      }
    }
    if(this.detectWinCondition()) {
      this.setState({ winner: this.state.turn });
      return;
    }
    this.setState({ board: localBoard, turn: (this.state.turn % 2) + 1 }, () => {
      if(this.state.ai !== null && this.state.turn === 2) {
        this.setState({ thinking: true });
        window.setTimeout(this.computerTurn, 1000) 
      }
    });
  }

  computerTurn = () => {
    console.info('taking computer turn ' + Math.random());
    if(this.state.ai != null) {
      let aiColumn = this.state.ai.getMove(this.state.board);
      this.setState({ thinking: false });
      this.dropTokenHandler(aiColumn);
    }
  }

  changeAIHandler = (event) => {
    console.info(event.target.value);
  }

  detectWinCondition = () => {
    for(let c = 0;  c < 4; ++c) {
      for(let r = 5; r > 2; --r) {
        let frame = this.getFrame(r, c);
        let winner = this.winLogic.checkForWin(frame);
        if(winner) {
          console.info(`Player ${this.state.turn} is a winner!`)
          return winner;
        }
      }
    }
  }

  getFrame = (row, col) => {
    let frame = [[],[],[],[]];
    for(let r = 0; r < 4; ++r) {
      for(let c = 0; c < 4; ++c) {
        frame[r].push(this.state.board[col + c][row - r]);
      }
    }
    return frame;
  }

  resetGame = () => {
    this.setState({
      board: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
      ],
      turn: 1,
      winner: 0
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Four-in-a-Row</h1>
        <Board turn={this.state.turn} state={this.state.board} dropped={this.dropTokenHandler}>
          <AISpinner thinking={this.state.thinking}></AISpinner>
        </Board>
        <ScoreBoard winner={this.state.winner} turn={this.state.turn} resetGame={this.resetGame}/>
      </div>
    );
  }
}

export default App;
