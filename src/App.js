import { Container } from 'react-bootstrap';
import styles from './App.module.css';
import NavBar from './components/utilities/NavBar';
import { Routes, Route } from 'react-router-dom';
import SignUpForm from './pages/auth/SignUpForm';
import LoginForm from './pages/auth/LoginForm';
import ProfilePage from './pages/profiles/ProfilePage';
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
import PlaceEditForm from './pages/places/PlaceEdit';



function App() {
  const currentUser = useCurrentUser();

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Routes>
          <Route exact path="/" element={currentUser ? <Home /> : <LoginForm />} />
          <Route exact path="/login" element={currentUser ? <Home /> : <LoginForm />} />
          <Route exact path="/signup" element={currentUser ? <Home /> : <SignUpForm />} />
          <Route exact path="/profiles/:id" element={currentUser ? <ProfilePage /> : <LoginForm /> } />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/places" element={<PlacesPage message="No Results found. Adjust the search keyword." />} />
          <Route exact path="/create-place" element={currentUser ? <CreatePlaceForm /> : <LoginForm />} />
          <Route exact path="/places/:id/edit" element={currentUser ? <PlaceEditForm /> : <LoginForm />} />
          <Route exact path="/new-post" element={currentUser ? <NewPostForm /> : <LoginForm />} />
          <Route exact path="*" element={<NotFound />} />
          <Route exact path="/places/:id" element={<PlacePage />} />
          <Route exact path="/posts" element={<Home message="No Results found. Adjust the search keyword." />} />
          <Route exact path="/posts/:id" element={<PostPage />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
