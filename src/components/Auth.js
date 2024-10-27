// src/components/Auth.js
import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import '../Auth.css'; // Optional: you can create a separate CSS file for the Auth component

const Auth = () => {
    const [isSignIn, setIsSignIn] = useState(true); // State to toggle between sign-in and sign-up

    return (
        <div className="auth-container">
            {isSignIn ? (
                <>
                    <SignIn />
                    <p>
                        Don't have an account?
                        <button onClick={() => setIsSignIn(false)}> Sign Up</button>
                    </p>
                </>
            ) : (
                <>
                    <SignUp />
                    <p>
                        Already have an account?
                        <button onClick={() => setIsSignIn(true)}> Sign In</button>
                    </p>
                </>
            )}
        </div>
    );
};

export default Auth;
