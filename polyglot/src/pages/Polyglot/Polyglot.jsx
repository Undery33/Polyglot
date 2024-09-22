import React from "react";
import './Polyglot.css'
import { useTranslation } from "react-i18next";

const Polyglot = () => {
    const { t } = useTranslation();

    return (
        <>
            <div className="main-info">
                <img src="/images/question.svg" className="main-info-img" />
                <h1>WHAT IS POLYGLOT</h1>
                {t('whatispolyglot').split('\n').map((line, index) => (
                    <span key={index}>
                        {line}
                        <br />
                    </span>
                ))}
                {t('wip_text1')} <br />
                {t('wip_text2')} <br />
                {t('wip_text3')} <br />
                {t('wip_text4')} <br />
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
                {t('wmt_text1')}<br />
                {t('wmt_text2')}<br />
            </div>

            <div className="third-info">
                <div className="third-cont">
                    <img src="/images/third_info.svg" className="third-info-img" />
                    <h1>{t('features')}</h1> <br />
                </div>
                {t('featuresText1')}<br />
                {t('featuresText2')}<br />
                <div className="info-cont">
                    <div className="info left-align">
                        <img src="/images/discord_3D.png" className="discord-3d-img" />
                        <div className="text-container">
                            <h1 className="h1-right">
                                {t('infodiv_1').split('\n').map((line, index) => (
                                    <span key={index}>
                                        {line}
                                        <br />
                                    </span>
                                ))}
                            </h1>
                            {t('infodiv_text1').split('\n').map((line, index) => (
                                <span key={index}>
                                    {line}
                                    <br />
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="info right-align">
                        <div className="text-container">
                            <h1 className="h1-left">
                                {t('infodiv_2').split('\n').map((line, index) => (
                                    <span key={index}>
                                        {line}
                                        <br />
                                    </span>
                                ))}
                            </h1>
                            {t('infodiv_text2').split('\n').map((line, index) => (
                                <span key={index}>
                                    {line}
                                    <br />
                                </span>
                            ))}
                        </div>
                        <img src="/images/chat_3D.png" className="chat-3d-img" />
                    </div>

                    <div className="info left-align">
                        <img src="/images/talk_3D.png" className="talk-3d-img" />
                        <div className="text-container">
                            <h1 className="h1-right2">
                                {t('infodiv_3').split('\n').map((line, index) => (
                                    <span key={index}>
                                        {line}
                                        <br />
                                    </span>
                                ))}
                            </h1>
                            {t('infodiv_text3').split('\n').map((line, index) => (
                                <span key={index}>
                                    {line}
                                    <br />
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="info right-align">
                        <div className="text-container">
                            <h1 className="h1-left2">
                                {t('infodiv_4').split('\n').map((line, index) => (
                                    <span key={index}>
                                        {line}
                                        <br />
                                    </span>
                                ))}
                            </h1>
                            {t('infodiv_text4').split('\n').map((line, index) => (
                                <span key={index}>
                                    {line}
                                    <br />
                                </span>
                            ))}
                        </div>
                        <img src="/images/feedback_3D.png" className="feedback-3d-img" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Polyglot