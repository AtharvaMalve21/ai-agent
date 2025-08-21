import React, { useState, createContext } from 'react';
import LoginForm from "./components/LoginForm.jsx"
import Dashboard from "./components/Dashboard.jsx";

// Context for authentication
const AuthContext = createContext();

const App = () => {
  const [token, setToken] = useState(() => {
    return null;
  });

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, handleLogin, handleLogout }}>
      <div className="App">
        {token ? (
          <Dashboard token={token} onLogout={handleLogout} />
        ) : (
          <LoginForm onLogin={handleLogin} />
        )}
      </div>
    </AuthContext.Provider>
  );
};

export default App;