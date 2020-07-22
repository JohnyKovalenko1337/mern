import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const activeHttpRequest = useRef([]);

    const setRequest = useCallback(async (
        url,
        method = 'GET', 
        headers = {},
        body = null,
    ) => {

        setIsLoading(true);
        const httpAbortController = new AbortController();
        activeHttpRequest.current.push(httpAbortController);

        try {
            const responce = await fetch(url,
                {
                    method,
                    headers,
                    body,
                    signal: httpAbortController.signal
                });
            const responceData = await responce.json();

            activeHttpRequest.current = activeHttpRequest.current.filter(
                reqCtrl => reqCtrl !== httpAbortController
            )

            if (!responce.ok) {
                throw new Error(responceData.message);
            }
            setIsLoading(false);
            return responceData;
          } catch (err) {
            setError(err.message);
            setIsLoading(false);
            throw err;
          }


    }, []);
    const handleError = () => {
        setError(null);
    };

    useEffect(() => {
        return ()=>{
            activeHttpRequest.current.forEach(abortCtrl=>{
                abortCtrl.abort();
            })
        }
    },
        []
    )
    return { isLoading, error, setRequest, handleError };
}