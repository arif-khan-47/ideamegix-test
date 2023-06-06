import React, { useState } from 'react';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleUsernameChange = (e: any) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    setIsButtonDisabled(!validateCredentials(newUsername, password));
  };

  const handlePasswordChange = (e: any) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsButtonDisabled(!validateCredentials(username, newPassword));
  };

  const validateCredentials = (username: string, password: string) => {
    const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
    const isUsernameValid = usernameRegex.test(username);
    const isPasswordValid = password.length >= 6;
    return isUsernameValid && isPasswordValid;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (validateCredentials(username, password)) {
      console.log('Valid username and password!');
      console.log('Username:', username);
      console.log('Password:', password);
      setUsername('');
      setPassword('');
    } else {
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit" disabled={isButtonDisabled}>
        Log In
      </button>
    </form>
  );
};

export default RegisterPage;
