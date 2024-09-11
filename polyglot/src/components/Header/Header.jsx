import React, { useState } from "react";
import './Header.css';
import LanguageModal from '../LanguageModal/LanguageModal';
import { Link } from "react-router-dom";
import i18n from 'i18next';
import { useTranslation } from "react-i18next";

const Header = () => {
    const {t} = useTranslation();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSelectLanguage = (language) => {
        i18n.changeLanguage(language);
        closeModal();
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
              <a href="https://discord.com/oauth2/authorize?client_id=1281312944994517054" target="_blank" rel="noopener noreferrer">Discord</a>
              <button className="lang-button" onClick={openModal}>
                <img src="/images/lang.png" className="langicon" alt="Language Icon" /> Language
              </button>
    
              {isModalOpen && (
                <LanguageModal
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  onSelectLanguage={handleSelectLanguage}
                />
              )}
            </div>
          </nav>
        </header>
      );
    }
    
    export default Header;