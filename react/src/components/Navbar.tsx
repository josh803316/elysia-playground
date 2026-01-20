import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <h1>Elysia Notes</h1>
        </Link>
      </div>

      <div className="navbar-menu">
        <SignedIn>
          <div className="user-section">
            <Link to="/notes" className="nav-link">
              My Notes
            </Link>
            <span className="welcome-message">
              Hello, {user?.firstName || "User"}
            </span>
            <UserButton />
          </div>
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="auth-button signin">Sign In</button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
