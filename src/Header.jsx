import React from "react";
import { Link, NavLink } from "react-router-dom";
const activeStyle = {
  color: "purple",
};
export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img alt="Carved Rock Fitness" src="/images/logo.png" />
            </Link>
          </li>
          <li>
            <NavLink to="/shoes" activeClassName={activeStyle}>
              Shoes
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" activeClassName={activeStyle}>
              Cart
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
