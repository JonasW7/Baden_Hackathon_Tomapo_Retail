import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/weather" >
        Weather
      </NavLink>
    </nav>
  );
}
