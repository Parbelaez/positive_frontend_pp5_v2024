import { Container } from 'react-bootstrap';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import SignUpForm from './pages/auth/SignUpForm';
import LoginForm from './pages/auth/LoginForm';
import NotFound from './pages/NotFound';
import About from './pages/About';
import './api/axiosDefaults';
import CreatePlaceForm from './pages/CreatePlaceForm';



function App() {

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Routes>
          <Route exact path="/" element={<h1>Home</h1>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/create-place" element={<CreatePlaceForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
