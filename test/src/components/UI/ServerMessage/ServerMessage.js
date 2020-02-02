import React from 'react';

import classes from './ServerMessage.module.scss';

const ServerMessage  = ({show, onCloseCLicked,  title, message, autoClose, type}) => {

    if(autoClose){
        setTimeout(() => {
            onCloseCLicked();
        }, 3000)
    }
    const messageClasses = [classes.ServerMessage, classes[type]];
    return(
        <div 
            className={messageClasses.join(' ')}
            style={{
                transform: show ? 'translateX(0)' : 'translateX(320px)',
                opacity: show ? '1' : '0'
              }}>
            <div className={classes.CloseContainer}>
                <span onClick={onCloseCLicked} className={classes.Close}>X</span>
                {title ? <div className={classes.Title}>{title}</div> : null}
            </div>
            <div>{message}</div>
        </div>
    );
};

export default ServerMessage;