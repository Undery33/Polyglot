import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './Footer.css';

const Footer = () => {
    const location = useLocation();
    const [footerClass, setFooterClass] = useState('site-footer');

    useEffect(() => {
        switch (location.pathname) {
            case '/':
                setFooterClass('site-footer footer-main');
                break;
            case '/Polyglot':
                setFooterClass('site-footer polyglot-footer');
                break;
            case '/How2use':
                setFooterClass('site-footer howtouse-footer');
                break;
            case '/Issue':
                setFooterClass('site-footer issue-footer');
                break;
            case '/Useweb':
                setFooterClass('site-footer useweb-footer');
                break;
            default:
                setFooterClass('site-footer');
        }
    }, [location.pathname]);

    return (
        <footer className={footerClass}>
            <div className="footer-content">
                <span>@ 2024 POLYGLOT, Inc.</span>
                <p>This project is a one-person project for a lab-scale presentation and can be operated in a real environment depending on the development environment.</p><br/>
                <div className="footer-links">
                    <a href="https://github.com/Undery33" className="git-link"><img src="./images/github.png" className="git-img" /><p className="dev-text">Dev GitHub</p></a>
                    <a href="#" className="help-link"><img src="./images/help_icon.png" className="help-img" /><p className="help-text">You Need Help?</p> </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer