import React from "react";
import Link from "next/link";

const Head = () => {
    return (
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
              integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
              crossOrigin="anonymous" />
    );
}

const Layout = (props) => {
  const Nav = () => (
    <ul className="nav nav-tabs bg-warning">
      <li className="nav-item">
          <Link href="/">
            <a className="nav-link text-dark" href="">Home</a>
          </Link>
      </li>
      <li className="nav-item">
          <Link href="/login">
            <a className="nav-link text-dark" >Login</a>
          </Link>
      </li>
      <li className="nav-item">
          <Link href="/register">
            <a className="nav-link text-dark" >Register</a>
          </Link>
      </li>
    </ul>
  );

  return (
      <>
        <Head />
        <Nav />
        {props.children}
        </>
  );
};

export default Layout;