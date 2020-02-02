import React from 'react';

import ServerMessage from '../components/UI/ServerMessage/ServerMessage';
import useHttpErrorHandler from '../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios, checkSuccess = false) => {
  return props => {
    const [error, clearError] = useHttpErrorHandler(axios, checkSuccess);
    let title = '';
    let type = '';


    if(error){
      const status = parseInt(error.status);
      title = error.statusText;
      if(error){
        title = error.data.message;
        if(status >= 500 && status < 600){
          type = "Error";
        }else if (status >= 200 && status < 300){
          type = "Success";
        }else if (status >= 400 && status < 500){
          if(status === 401){
            title = error.statusText
          }
          type = "Warning";
        }
      }
    }
    return (
      <React.Fragment>
        <ServerMessage show={error} onCloseCLicked={clearError} title={title} message=''  type={type}/>
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  };
};

export default withErrorHandler;
