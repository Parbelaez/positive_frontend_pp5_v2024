import { Container } from 'react-bootstrap';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import SignUpForm from './pages/auth/SignUpForm';
import LoginForm from './pages/auth/LoginForm';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Home from './pages/posts/AllPostsPage';
import PlacesPage from './pages/places/AllPlacesPage';
import './api/axiosDefaults';
import CreatePlaceForm from './pages/places/CreatePlaceForm';
import NewPostForm from './pages/posts/NewPostForm';
import PlacePage from './pages/places/PlacePage';
import PostPage from './pages/posts/PostPage';
import { useCurrentUser } from './contexts/CurrentUserContext';
// !!! DELETE
import TestPage from './pages/TestPage';
import PlaceEditForm from './pages/places/PlaceEdit';



function App() {
  const currentUser = useCurrentUser();
  // const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Routes>
          <Route exact path="/" element={currentUser ? <Home /> : <LoginForm />} />
          <Route exact path="/login" element={currentUser ? <Home /> : <LoginForm />} />
          <Route exact path="/signup" element={<SignUpForm />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/places" element={<PlacesPage message="No Results found. Adjust the search keyword." />} />
          <Route exact path="/create-place" element={<CreatePlaceForm />} />
          <Route exact path="/places/:id/edit" element={<PlaceEditForm />} />
          <Route exact path="/new-post" element={<NewPostForm />} />
          <Route exact path="*" element={<NotFound />} />
          <Route exact path="/places/:id" element={<PlacePage />} />
          <Route exact path="/posts" element={<Home message="No Results found. Adjust the search keyword." />} />
          <Route exact path="/posts/:id" element={<PostPage />} />
          {/* !!! DELETE */}
          <Route exact path="/test" element={<TestPage />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
