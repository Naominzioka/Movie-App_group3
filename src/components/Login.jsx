import React, { useState } from "react";

function Login({ onLogin }) {
    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault(); // This stops the page from refreshing 🛑
        if (inputName && inputEmail) {
            onLogin(inputName, inputEmail);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Name"
                            value={inputName}
                            onChange={(e) => setInputName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={inputEmail}
                            onChange={(e) => setInputEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;