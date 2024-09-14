import React, { useState } from "react";
import './Header.css';
import LanguageModal from '../LanguageModal/LanguageModal';
import { Link } from "react-router-dom";
import i18n from '../../i18n';
import { useTranslation } from "react-i18next";

const Header = () => {
    const {t} = useTranslation();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleSelectLanguage = (language) => {
      i18n.changeLanguage(language);
      setIsDropdownOpen(false);
    };

      return (
        <header className="site-header">
          <nav className="main-nav">
            <Link to="/" className="logo">
              <img src="/images/logo.png" alt="Main logo" className="mainlogo" />
            </Link>
    
            <div className="nav-center">
              <Link to="/Polyglot" className="info-link">POLYGLOT</Link>
              <Link to="/How2use" className="info-link">How To Use</Link>
              <Link to="/Issue" className="info-link">Issue</Link>
            </div>
    
            <div className="nav-right">
              <a
                href="https://discord.com/oauth2/authorize?client_id=1281312944994517054"
                target="_blank"
                rel="noopener noreferrer"
              >
                Discord
              </a>
              <button className="lang-button" onClick={toggleDropdown}>
                <img src="/images/lang.png" className="langicon" alt="Language Icon" /> Language
              </button>

              <ul className={`language-dropdown ${isDropdownOpen ? 'show' : ''}`}>
                <li 
                  onClick={() => handleSelectLanguage('English')}
                  className={i18n.language === 'English' ? 'selected' : ''}
                >
                  <img src="./images/us_flag.png" className="flag-img"/>
                  English
                  <span className="checkmark">✔️</span>
                </li>
                <li 
                  onClick={() => handleSelectLanguage('한국어')}
                  className={i18n.language === '한국어' ? 'selected' : ''}
                >
                  <img src="./images/kr_flag.png" className="flag-img"/>
                  한국어
                  <span className="checkmark">✔️</span>
                </li>
                <li 
                  onClick={() => handleSelectLanguage('日本語')}
                  className={i18n.language === '日本語' ? 'selected' : ''}
                >
                  <img src="./images/jp_flag.png" className="flag-img"/>
                  日本語
                  <span className="checkmark">✔️</span>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      );
    }
    
    export default Header;