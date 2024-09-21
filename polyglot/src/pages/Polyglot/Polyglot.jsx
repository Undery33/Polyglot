import React from "react";
import './Polyglot.css'
import { useTranslation } from "react-i18next";

const Polyglot = () => {
    const {t} = useTranslation();
    
    return (
        <>
            <div className="main-info">
                <img src="/images/question.svg" className="main-info-img"/>
                <h1>WHAT IS POLYGLOT</h1>
                {t('whatispolyglot').split('\n').map((line, index) => (
                        <span key={index}>
                            {line}
                            <br />
                        </span>
                    ))}
                {t('wip_text1')} <br/>
                {t('wip_text2')} <br/>
                {t('wip_text3')} <br/>
                {t('wip_text4')} <br/>
            </div>

            <div className="sec-info">
                <img src="/images/talk_make.svg" className="sec-info-img" />
                <h1>WHY MAKE THIS</h1>
                {t('whymakethis').split('\n').map((line, index) => (
                        <span key={index}>
                            {line}
                            <br />
                        </span>
                    ))}
                {t('wmt_text1')}<br/>
                {t('wmt_text2')}<br/>
            </div>

            <div className="third-info">
                <img src="/images/third_info.svg" className="third-info-img" />
                <h1>{t('features')}</h1> <br/>
                {t('featuresText1')}<br/>
                {t('featuresText2')}<br/>
                (표 들어가야될 곳)
            </div>
        </>
    )
}

export default Polyglot