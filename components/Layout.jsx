import React from "react";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Head = () => {
    return (
        <>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
              integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
              crossOrigin="anonymous" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.css"
                  integrity="sha512-DanfxWBasQtq+RtkNAEDTdX4Q6BPCJQ/kexi/RftcP0BcA4NIJPSi7i31Vl+Yl5OCfgZkdJmCqz+byTOIIRboQ=="
                  crossOrigin="anonymous" referrerPolicy="no-referrer"/>
        </>
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