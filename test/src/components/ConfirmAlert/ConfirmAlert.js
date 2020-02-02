import React from 'react';

import Modal from '../UI/Modal/Modal';
import classes from './ConfirmAlert.module.scss';

const ConfirmAlert = ({question, onClose, onOk}) => {

    const handleClose = () => {
        onClose();
    };

    const handleOk = () => {
        onOk();
    }


    return (
        <Modal show width="300px" onCloseCLicked={handleClose}>
            <div>{question}</div>
            <div className={classes.ButtonsContainer}>
                <div className={classes.ButtonContainer}>
                    <button onClick={handleClose}>Cancel</button>
                </div>
                <div className={classes.ButtonContainer}>
                    <button onClick={handleOk}>Ok</button>
                </div>
            </div>
        </Modal>
    );

};

export default ConfirmAlert;