import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export function useClient(){
    const [user, setUsername] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state && location.state.user) {
            const username = location.state.user;
            setUsername(username);
        }
    }, [location.state]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(user);
                const response = await fetch('http://localhost:3001/clients/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user }),
                });
                if (response.ok) {
                    if (await response.text() === 'false') {
                        navigate('/');
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return {user, navigate}

}