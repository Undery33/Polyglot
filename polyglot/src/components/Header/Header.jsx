import React from "react";
import './Header.css';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="site-header">
            <nav className="main-nav">
                <Link to="/" className="logo">
                <img src="/images/logo.png" alt="Main logo" className="mainlogo" />
                </Link>

                <div className="nav-center">
                <Link to="Polyglot" className="info-link">POLYGLOT</Link>
                <Link to="How2use" className="info-link">How To Use</Link>
                <Link to="Issue" className="info-link">Issue</Link>
                </div>

                <div className="nav-right">
                <a href="https://discord.com/">Discord</a>
                <button className="lang-button">
                    <img src="/images/lang.png" className="langicon" />Language
                </button>
                </div>
            </nav>
        </header>



    )
}

export default Header