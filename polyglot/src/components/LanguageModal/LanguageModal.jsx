import React from 'react';
import './LanguageModal.css';
import { useTranslation } from 'react-i18next';

const LanguageModal = ({ isOpen, onClose, onSelectLanguage }) => {
  const languages = ['English', '한국어', '日本語'];
  const {t} = useTranslation();

  if (!isOpen) return null; 

  return (
    <div className="modal-overlay"> 
      <div className="modal-content"> 
        <h2>{t('SelectLang')}</h2>
        <ul>
          {languages.map((language) => (
            <li key={language}>
              <button 
                className="language-button"
                onClick={() => onSelectLanguage(language)}
              >
                {language.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LanguageModal;
