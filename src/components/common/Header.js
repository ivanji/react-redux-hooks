import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };

  return (
    <nav>
      <NavLink activeStyle={activeStyle} to="/" exact>
        Home
      </NavLink>
      {" | "}
      <NavLink activeStyle={activeStyle} to="/courses" exact>
        Courses
      </NavLink>
      {" | "}
      <NavLink activeStyle={activeStyle} to="/about" exact>
        About
      </NavLink>
    </nav>
  );
};

export default Header;
