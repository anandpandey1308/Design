//This is the header file, used to create the header, which will pe present in all the page,
// with LINK to all other page.It is Imported in App.js file as "</Header> tag, which will "

import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const activeStyle = { color: "red" };
  const style = { padding: 5 };
  const navStyle = {
    marginTop: 10,
    borderRadius: 5,
    marginBottom: 5,
    padding: 5,
    float: "right",
    color: "blue"
  };
  return (
    <div style={{ paddingBottom: 120 }}>
      <nav style={navStyle}>
        <NavLink activeStyle={activeStyle} style={style} exact to="/">
          Home
        </NavLink>
        {"   |   "}
        <NavLink activeStyle={activeStyle} style={style} to="/form-docker">
          Form
        </NavLink>
      </nav>
    </div>
  );
}
export default Header;
