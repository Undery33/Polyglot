import React from "react";
import './Header.css';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="site-header">
            <nav className="main-nav">
            <Link to="/" className="logo"><img src="/images/logo.png" alt="Main logo" className="mainlogo"/></Link>
                <Link to="Polyglot" className="info-link">POLYGLOT</Link>
                <Link to="How2use" className="info-link">How To Use</Link>
                <Link to="Issue" className="info-link">Issue</Link>
                <a href="https://discord.com/">Discord</a>
                <button className="lang-button">Language</button>
            </nav>
        </header>
    )
}

export default Header