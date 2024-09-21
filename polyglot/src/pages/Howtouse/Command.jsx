import React from "react";
import './Command.css';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


const Command = () => {
    const navigate = useNavigate();
    const how2useButton = () => {
        navigate('/Issue');
    }
    
    const {t} = useTranslation();

    return (
        <>
            <div className="cmd-info">
                <img src="/images/command.svg" className="cmd-info-img" />
                <h1>{t('commands')}</h1>
                {t('cmd_text1')}<br/>
                {t('cmd_text2')}<br/>
                <button className="issue-btn" onClick={how2useButton}>
                    <img src="/images/help_icon.svg" className="help-img" />
                    {t('support')}
                </button>
            </div>

            <div className="cmd">
                표1, 표2 등 표를 만들어 만든 명령어 정리하기
            </div>
        </>
    )
}

export default Command