// src/components/SignIn.js
import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../SignIn.css'; // Import the CSS file

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError(''); // Reset error state
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Handle successful sign-in (redirect, show message, etc.)
            alert("Sign-in successful!"); // For demonstration
        } catch (error) {
            setError(error.message); // Set the error message
        }
    };

    return (
        <div className="signin-container">
            <h2>Sign In</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSignIn}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;
