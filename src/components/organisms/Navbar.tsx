import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav className="font-bold gap-4 flex p-4 bg-blue-300">
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/weather" >
        Weather
      </NavLink>
    </nav>
  );
}
