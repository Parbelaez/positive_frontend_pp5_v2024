import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import SignUpForm from './pages/auth/SignUpForm';
import LoginForm from './pages/auth/LoginForm';
import NotFound from './pages/NotFound';
import About from './pages/About';
import axios from 'axios';
import './api/axiosDefaults';
import { createContext, useEffect } from 'react';

export const CurrentUserContext = createContext(null);
export const SetCurrentUserContext = createContext(null);

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleMount = async () => {
    try {
      const { userData } = await axios.get('/dj-rest-auth/user/');
      setCurrentUser(userData);
    } catch (error) {
      console.error('An error occurred:', error.response);
    }
  }

  useEffect(() => {
    handleMount();
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Routes>
              <Route exact path="/" element={<h1>Home</h1>} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
        </div>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
