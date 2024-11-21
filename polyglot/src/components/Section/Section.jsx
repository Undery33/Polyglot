import React from "react";
import "./Section.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Section = () => {
    const navigate = useNavigate();
    const usewebHandle = () => {
        navigate('/Useweb');
    };
    const {t} = useTranslation();

    return (
        <>
            <div className="first-text">
                <div className="ftext">
                    <h1>{t('LiveTranslate').split('\n').map((line, index) => (
                        <span key={index}>
                            {line}
                            <br />
                        </span>
                    ))}</h1>
                    <p className="ftext-in">
                        {t('LiveTranslatetext1')}<br/>
                        {t('LiveTranslatetext2')}
                    </p>
                    <div className="exp-btn">
                        <button className="discord-btn" onClick={() => window.location.href = "https://discord.com/oauth2/authorize?client_id=1281312944994517054"}>
                            <img src="./images/discord.png" className="discord-img" />
                        </button>
                        <button className="web-btn" onClick={usewebHandle}>
                            <img src="./images/web_ill.png" className="web-img" />
                            <p className="web-text">WEB</p>
                        </button>
                    </div>
                </div>
                <br/>
                <img src="./images/Group_chat_ill.svg" className="first-img"/>
            </div>

            <div className="second-text">
                <img src="./images/Reminders_ill.svg" className="second-img" />
                <div className="stext">
                    <h1>{t('VoiceTTS')}</h1>
                    {t('VoiceTTStext1')} <br/>
                    {t('VoiceTTStext2')} <br/>
                </div>
            </div>
            
            <div className="third-text">
                <div className='ttext'>
                    <h1>{t('conquerTheWorld')}</h1>
                    {t('conquerTheWorldtext1')} <br/>
                    {t('conquerTheWorldtext2')} <br/>
                </div>
                <img src="./images/world_ill.svg" className="third-img" />
            </div>
            
        </>
    )
}

export default Section