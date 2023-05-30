import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './css/autorization_register.css';

export const Authentication: React.FC = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('')
        try {
                const response = await fetch('http://localhost:3001/clients/find', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: user, password: password }),
                });
                if (response.ok) {
                    const result = await response.text();
                    if (result === 'false') {
                        setError('Неправильный логин или пароль');
                    } else {
                        navigate('/main', { state: { user } });
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
            setError('Error');
        }
    };

    return (
        <div className="authorization">
            <div className="App">
                <h1>Войти в аккаунт</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />
                    </div>
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
                    {error && <p>{error}</p>}
                    <button className="button-for-enter" type="submit">Enter</button>
                </form>
                <button className="button-for-register" onClick={() =>navigate('/register')}>Регистрация</button>
            </div>
        </div>
    );
};