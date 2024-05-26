// components/login/LoginForm.js
import React, { useState, useContext } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { classNames } from 'primereact/utils';
import AppContentContext from '@/components/layout/appcontentcontext';
import AppContentContext from '@/components/layout/appcontentcontext';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loginError, setLoginError] = useState(null);

    const { darkMode, toggleDarkMode } = useContext(AppContentContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        // Reset previous error
        setLoginError(null);

        // Mock login logic for demonstration purposes
        // Replace this with your actual login logic
        if (username === 'admin' && password === 'admin') {
            alert('Login successful!');
        } else {
            setLoginError('Invalid username or password');
        }
    };

    const getFormErrorMessage = (field) => {
        if (submitted && !field) {
            return <small className="p-error">Field is required</small>;
        }

        return null;
    };

    return (
        <div className={classNames('login-form', { 'dark-mode': darkMode })}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="p-field">
                    <label htmlFor="username">Username</label>
                    <InputText
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={classNames({ 'p-invalid': submitted && !username })}
                        required
                    />
                    {getFormErrorMessage(username)}
                </div>
                <div className="p-field">
                    <label htmlFor="password">Password</label>
                    <Password
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        feedback={false}
                        className={classNames({ 'p-invalid': submitted && !password })}
                        required
                    />
                    {getFormErrorMessage(password)}
                </div>
                <Button type="submit" label="Login" className="p-mt-2" />
            </form>
            {loginError && (
                <div className="p-mt-2">
                    <Message severity="error" text={loginError} />
                </div>
            )}
            <Button onClick={toggleDarkMode} label={`Toggle ${darkMode ? 'Light' : 'Dark'} Mode`} className="p-mt-2" />
        </div>
    );

};

export default LoginForm;
