import React from 'react';
import css from './AISpinner.module.css';

const AISpinner = (props) => {
    let classes = css.Hidden;
    if(props.thinking === true) {
        classes = css.Spinner;
    }
    return <div className={classes}><h1><i className="fas fa-computer-classic fa-3x"></i><br/>Thinking...</h1></div>
}

export default AISpinner;