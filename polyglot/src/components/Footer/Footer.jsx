import React from "react";
import './Footer.css';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer-content">
                <span>@ 2024 POLYGLOT, Inc.</span>
                <p>This project is a one-person project for a lab-scale presentation and can be operated in a real environment depending on the development environment.</p><br/>
                <div className="footer-links">
                    <a href="https://github.com/Undery33">Dev GitHub </a>
                    <a href="#">You Need Help? </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer