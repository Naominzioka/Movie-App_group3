import React, { useState } from 'react';

async function loginUser(credentials) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // We check if the username exists and password is at least 8 characters
            if (credentials.username?.length > 0 && credentials.password?.length >= 8) {
                resolve({
                    token: "fake-jwt-token-123"
                });
            } else if (credentials.password?.length < 8) {
                reject("Password must be at least 8 characters long");
            } else {
                reject("Please enter a username");
            }
        }, 500);
    });
}

function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await loginUser({ username, password });
            setToken(response);
        } catch (error) {
            alert(error);
        }
    }
    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login;