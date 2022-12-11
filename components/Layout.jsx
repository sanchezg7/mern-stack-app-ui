import React from "react";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { isAuth, logout } from "../user/auth";

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Head = () => {
    return (
        <>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
              integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
              crossOrigin="anonymous" />
        </>
    );
}

const Layout = (props) => {
    const auth = isAuth();
  const Nav = () => (
    <ul className="nav nav-tabs bg-warning">
      <li className="nav-item">
          <Link href="/">
            <a className="nav-link text-dark" href="">Home</a>
          </Link>
      </li>
        {!auth && (
            <>
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
            </>
        )}
        {
            auth && auth.role === "admin" && (
                <li className="nav-item ml-auto">
                    <Link href="/admin">
                        <a className="nav-link text-dark">Admin</a>
                    </Link>
                </li>
            )
        }
        {
            auth && auth.role === "subscriber" && (
                <li className="nav-item ml-auto">
                    <Link href="/user">
                        <a className="nav-link text-dark">{auth.name}</a>
                    </Link>
                </li>
            )
        }
        { auth && (
            <li className="nav-item">
                <a onClick={logout} className="nav-link text-dark">Logout</a>
            </li>
        )}
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