import React from 'react';
import css from './Board.module.css';

const Board = (props) => {
    const dropHandler = (colIndex) =>  {
        props.dropped(colIndex);
    };

    const turn = props.turn;
    const cssClasses = [css.GameColumn];
    if(turn === 2) {
        cssClasses.push(css.GameColumnRed);
    }
    else {
        cssClasses.push(css.GameColumnYellow);
    }
    const columnClass = cssClasses.join(' ');

    const columns = props.state.map((c, colIndex) => {
        const rows = c.map((r, rowIndex) => {
            const classList = [css.GameSpace];
            if(r === 1) {
                classList.push(css.Player1);
            }
            if(r === 2) {
                classList.push(css.Player2);
            }
            return (<div key={`row${rowIndex}_col${colIndex}`} className={classList.join(' ')} onClick={() => dropHandler(colIndex)}></div>)
        });
        return(<div key={`column${colIndex}`} className={columnClass}>{rows}</div>)
    });

    return (<div id="board">
        {columns}
    </div>)
};

export default Board;