import {useState, useEffect} from 'react';

const useHttpErrorHandler = (httpClient) => {
    const [error, setError] = useState(null);

    const reqInterceptor = httpClient.interceptors.request.use(req => {
        setError(null);
        return req;
    });
    const resInterceptor = httpClient.interceptors.response.use(res => res, err =>{
        setError(err);
    });
    const httpReqEject = httpClient.interceptors.request.eject(reqInterceptor);
    const httpResEject = httpClient.interceptors.response.eject(resInterceptor);
    useEffect(()=>{
        return ()=>{
            httpReqEject();
            httpResEject();
        }
    },[httpReqEject,httpResEject]);

    const errorConfirmedHandler = () => {
        setError(null);
    };

    return [error, errorConfirmedHandler];
}

export default useHttpErrorHandler;