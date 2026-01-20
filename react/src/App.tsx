import { useUser } from "@clerk/clerk-react";
import { Routes, Route } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";
import "./App.css";
import HomePage from "./pages/HomePage";
import { NotesPage } from "./pages/NotesPage";
import { NoteForm } from "./components/NoteForm";
import { Layout } from "./components/Layout";

function App() {
  const { isLoaded } = useUser();

  // Show loading state while Clerk loads
  if (!isLoaded) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/notes"
        element={
          <Layout>
            <NotesPage />
          </Layout>
        }
      />
      <Route
        path="/notes/new"
        element={
          <Layout>
            <NoteForm />
          </Layout>
        }
      />
      <Route
        path="/notes/:id/edit"
        element={
          <Layout>
            <NoteForm />
          </Layout>
        }
      />
      <Route
        path="/sign-in/*"
        element={
          <Layout>
            <SignIn routing="path" path="/sign-in" />
          </Layout>
        }
      />
      <Route
        path="/sign-up/*"
        element={
          <Layout>
            <SignUp routing="path" path="/sign-up" />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
