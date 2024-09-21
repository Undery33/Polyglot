import React from "react";
import './Pathnote.css';
import { useTranslation } from "react-i18next";

const Pathnote = () => {
    const {t} = useTranslation();

    return (
        <>
            <div className="first-div">
                <h1>{t('issue')}</h1>
            </div>

            <div className="path-div">
                <h1>{t('pathnote')}</h1>
            </div>

            <div className="help-div">
                <h1>{t('uneedhelp')}</h1>

            </div>
        </>
    )
}

export default Pathnote