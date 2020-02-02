import { useState, useEffect } from 'react';

export default (httpClient, checkSuccess = false)  => {
    const [error, setError] = useState(null);

    const reqInterceptor = httpClient.interceptors.request.use(req => {
      setError(null);
      return req;
    });
    const resInterceptor = httpClient.interceptors.response.use(
      res => {
        if(!checkSuccess){
          return res
        }
        setError(res);
      },
      err => {
        setError(err.response);
      }
    );

    useEffect(() => {
      return () => {
        httpClient.interceptors.request.eject(reqInterceptor);
        httpClient.interceptors.response.eject(resInterceptor);
      };
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return [error, errorConfirmedHandler];
}