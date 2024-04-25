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
import NewPostForm from './pages/NewPostForm';
import PlacePage from './pages/PlacePage';



function App() {

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Routes>
          <Route exact path="/" element={<h1>Home</h1>} />
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/signup" element={<SignUpForm />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/create-place" element={<CreatePlaceForm />} />
          <Route exact path="/new-post" element={<NewPostForm />} />
          <Route exact path="*" element={<NotFound />} />
          <Route exact path="/places/:id" element={<PlacePage />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
