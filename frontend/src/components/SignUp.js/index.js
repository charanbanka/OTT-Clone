import React, { useState } from 'react';
import "./signup.css"

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Add code to handle sign-up logic
    console.log('Sign up:', email, password);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
