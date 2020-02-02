import React from 'react';

import classes from './Modal.module.scss';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => {
  // shouldComponentUpdate ( nextProps, nextState ) {
  //     return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  // }


  let modalClassses = [classes.Modal];
  if(!props.removePadding){
    modalClassses.push(classes.Paddings);
  }
  return (
    <React.Fragment>
      <Backdrop show={props.show} clicked={props.onCloseCLicked} />
      <div
        className={modalClassses.join(' ')}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0',
          width: `${props.width}`
        }}
      >
        <div className={classes.CloseContainer}>
            {props.hideX ? null : <span onClick={props.onCloseCLicked} className={classes.Close}>X</span>}
            {props.title ? <div className={classes.Title}>{props.title}</div> : null}
        </div>
        {props.children}
      </div>
    </React.Fragment>
  );
};

export default React.memo(
  modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
 