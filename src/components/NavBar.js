import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";
import * as Color from "../shared/color/color";
const LogoSrc = "/img/Logo.png";

function NavBar() {
  const [click, setClick] = useState(false);

  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img src={LogoSrc} className="logo" alt="logo"/>
            <p style={{ fontSize: 20, color: Color.COLOR1, textDecoration: "none"}}>
              MANAGE RESERVATION
            </p>
          </Link>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/reservation" className="nav-links" onClick={closeMobileMenu}>
                RESERVATION
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/dishes"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                DISHES
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
