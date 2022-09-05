import React from "react";

const Layout = (props) => {
  const Nav = () => (
    <ul className="nav">
      <li className="nav-item">
        <a className="nav-link" href="">Home</a>
      </li>
      <li>
        <a className="nav-link" href="">Login</a>
      </li>
      <li>
        <a className="nav-link" href="">Register</a>
      </li>
    </ul>
  );

  return <>
    <Nav />
      {props.children}
  </>
};

export default Layout;