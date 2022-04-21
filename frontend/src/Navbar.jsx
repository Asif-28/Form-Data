import React from "react";
import "./App.css";

function Navbar() {
  return (
    <div>
      <nav className="navbar ">
        <ul>
          <li>
            <a className="nav-items" href="#Home">
              Home
            </a>
          </li>
          <li>
            <a className="nav-items" href="#About-us">
              About
            </a>
          </li>
          <li>
            <a className="nav-items" href="#Contact-us">
              Contact-us
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Navbar;
