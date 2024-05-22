import React, { useState } from 'react';
import AppApi from '../../services/appApi';
import styles from './Login.module.css';
import clearError from '../../utils/errorUtil';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [twofa, setTwofa] = useState('');
    const [authError, setAuthError] = useState('');
    const [twoFAError, setTwoFAError] = useState('');
    const [userExists, setUserExists] = useState(false);
    const baseURL = process.env.REACT_APP_BASE_URL;

    const handleLogin = event => {
        // Perform your login logic here
        // For example, check username and password, and call onLogin(true) if successful
        event.preventDefault();
        if (password && username) {
            if (!twofa) {
                AppApi.post(baseURL + '/login', {
                    username: username,
                    password: password,
                }).then(
                    response => {
                        if (response.status === 203) {
                            setUserExists(true);
                        }
                    },
                    error => {
                        setAuthError('Invalid Credentials');
                        clearError(setAuthError, 3000);
                    }
                );
            } else if (twofa) {
                AppApi.post(baseURL + '/login', {
                    username: username,
                    password: password,
                    twoFACode: twofa,
                }).then(
                    response => {
                        if (response.status === 200) {
                            onLogin(response.data.tokens.access, response.data.tokens.refresh);
                        } else if (response.status === 203) {
                            setTwoFAError('Invalid 2FA code, A code was sent again');
                            clearError(setTwoFAError, 5000);
                        }
                    },
                    error => {
                        setAuthError('Invalid Username or Password');
                        clearError(setAuthError, 3000);
                    }
                );
            }
        }
    };

    return (
        <div className={styles['login-container']}>
            {(Boolean(authError) || Boolean(twoFAError)) && (
                <div className={styles['error']}>{authError || twoFAError}</div>
            )}
            <h2 className={styles['login-heading']}>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    required
                    onChange={e => setUsername(e.target.value)}
                    className={styles['login-input']}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    required
                    onChange={e => setPassword(e.target.value)}
                    className={styles['login-input']}
                />
                {userExists && (
                    <input
                        type="text"
                        placeholder="Please enter 2fa Code"
                        value={twofa}
                        required
                        onChange={e => setTwofa(e.target.value)}
                        className={styles['login-input']}
                    />
                )}
                <input type="submit" value="Login" className={styles['login-button']} />
            </form>
        </div>
    );
}

export default Login;
