import React from 'react';

import classes from './Button.module.scss';

const button = (props) => (
    <button
        disabled={props.disabled}
        className={[classes[props.btnType],classes.Button].join(' ')}
        onClick={props.clicked}>{props.children}</button>
);

export default button;