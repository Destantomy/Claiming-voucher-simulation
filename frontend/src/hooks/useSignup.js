import { useState } from 'react';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(null);
    const [created, setCreated] = useState(null);

    const signup = async (username, password, email, nama) => {
        setError(null);
        setLoading(true);
        setCreated(null);

        try {
            const res = await fetch('http://localhost:4040/api/auth/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password, email, nama}),
            });
            const json = await res.json();
            if (!res.ok) {
                setError(json.error);
                }
            else if (res.ok) {
                setCreated(json.message);   
                }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        };
    }
    return {signup, isLoading, error, created}
}