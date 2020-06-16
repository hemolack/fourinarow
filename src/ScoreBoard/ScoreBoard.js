import React from 'react';
import css from './ScoreBoard.module.css';

const scoreBoard = (props) => {
    const getNoticeClass = () => {
        if(props.winner > 0) {
            return props.winner === 1 ? css.Player1 : css.Player2;
        }
        return props.turn === 1 ? css.Player1 : css.Player2;
    }

    const newGameHandler = () => {
        props.resetGame();
    }

    let turnClass = getNoticeClass();
    let turnNotice = props.winner > 0 ? <h2 className={turnClass}>Player {props.winner} wins!</h2> : <h2 className={turnClass}>Player {props.turn}'s turn</h2>;
    return ( 
        <div className={css.ScoreBoardControl}>
            <button className={css.NewGame} onClick={newGameHandler}>New Game</button>
            {turnNotice}
        </div>
    );
}

export default scoreBoard;