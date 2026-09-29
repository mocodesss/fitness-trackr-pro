import { useAuth } from "../auth/AuthContext";
import { NavLink } from "react-router";

/** Navbar with site navigation links */
export default function Navbar() {
  const { token, logout } = useAuth();

  return (
    <header>
      <p>Fitness Trackr</p>
      <nav>
        <NavLink to="/">Activities</NavLink>
        <NavLink to="/routines">Routines</NavLink>
        {!token ? (
          <>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        ) : (
          <a onClick={() => logout()}>Log out</a>
        )}
      </nav>
    </header>
  );
}
