import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(null);
    const [succeed, setSucceed] = useState(null);
    const {dispatch} = useAuthContext();

    const login = async(username, password) => {
        setError(null);
        setLoading(true);
        setSucceed(null);

        try {
            const res = await fetch('http://localhost:4040/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password})
            });
            const json = await res.json();
            if(!res.ok) {
                setLoading(false);
                setError(json.error);
            }
            else if(res.ok) {
                // save user payload into local storage
                localStorage.setItem('user', JSON.stringify(json));
                // update auth context
                dispatch({
                    type: 'LOGIN',
                    payload: json,
                });
            }
        } catch (error) {
            setError(error)
        } finally {
            // update loading state
            setLoading(false);
        }
    }
    return { login, isLoading, error, succeed }
}