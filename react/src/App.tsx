/**
 * Root: route tree and global loading. We gate on useUser().isLoaded so we don't
 * render protected routes before Clerk has restored session (avoids flash of wrong UI).
 */
import {useUser} from '@clerk/clerk-react';
import {Routes, Route} from 'react-router-dom';
import {SignIn, SignUp} from '@clerk/clerk-react';
import './App.css';
import HomePage from './pages/HomePage';
import {NotesPage} from './pages/NotesPage';
import {NoteForm} from './components/NoteForm';
import {Layout} from './components/Layout';
import {StorybookFrame} from './components/StorybookFrame';

function App() {
  const {isLoaded} = useUser();

  if (!isLoaded) {
    return <div className='loading'>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path='/'
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path='/notes'
        element={
          <Layout>
            <NotesPage />
          </Layout>
        }
      />
      <Route
        path='/notes/new'
        element={
          <Layout>
            <NoteForm />
          </Layout>
        }
      />
      <Route
        path='/notes/:id/edit'
        element={
          <Layout>
            <NoteForm />
          </Layout>
        }
      />
      <Route
        path='/storybook/react'
        element={
          <Layout>
            <StorybookFrame />
          </Layout>
        }
      />
      <Route
        path='/sign-in/*'
        element={
          <Layout>
            <SignIn routing='path' path='/sign-in' />
          </Layout>
        }
      />
      <Route
        path='/sign-up/*'
        element={
          <Layout>
            <SignUp routing='path' path='/sign-up' />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
