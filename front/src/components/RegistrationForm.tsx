import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import './css/authorization_register.css';

export const RegistrationForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [repeat_password, setRepeat_password] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password === repeat_password){
            try {
                const response = await fetch('http://localhost:3001/clients', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, username, password }),
                });
                if (response.ok) {
                    const result = await response.text()
                    if (result === 'false'){
                        setError('Логин или почта уже существует')
                    }else{
                        console.log('User created successfully');
                        navigate('/')
                    }
                } else if (response.status === 400) {
                    const errorResponse = await response.json();
                    const firstError = Object.values(errorResponse.message[0])[0] as string;
                    setError(firstError);
                } else {
                    setError('Error');
                }
            } catch (e) {
                console.error(e);
                setError('Error creating user');
            }
        }
        else{
            setError('Несоответствие паролей')
        }
    };

    return (
        <div className="register">
            <div className="App">
                <h1>Регистрация</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password">Repeat Password:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={repeat_password}
                            onChange={(e) => setRepeat_password(e.target.value)}
                        />
                    </div>
                    {error && <p>{error}</p>}
                    <button className="button-for-enter" type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};