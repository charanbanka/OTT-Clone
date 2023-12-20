import React, { useState } from "react";
import "./signin.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    // Add code to handle sign-in logic
    console.log("Sign in:", email, password);
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="button" onClick={handleSignIn}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
