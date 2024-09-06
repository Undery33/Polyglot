import React from "react";
import "./Section.css";

const Section = () => {
    return (
        <>
            <div className="first-text">
                <p className="ftext">
                    <h1>실시간 번역, 자연스러운 대화</h1>
                    <p className="ftext-in">
                        채팅으로 번역하던 시절은 안녕, <br/>
                        POLYGLOT을 이용한 실시간 번역을 디스코드에서도 체험해보세요.
                    </p>
                    <div className="exp-btn">
                        <button className="discord-btn" onClick={() => window.location.href = "https://discord.com/oauth2/authorize?client_id=1281312944994517054"}>
                            <img src="./images/discord.png" className="discord-img" />
                        </button>
                        <button className="web-btn">
                            <img src="./images/web_ill.png" className="web-img" />
                            <p className="web-text">WEB</p>
                        </button>
                    </div>
                </p>
                <br/>
                <img src="./images/Group_chat_ill.svg" className="first-img"/>
            </div>

            <div className="second-text">
                <img src="./images/Reminders_ill.svg" className="second-img" />
                <p className="stext">
                    <h1>TTS로 듣는 깔끔한 음성</h1>
                    어떻게 실시간 번역이 가능하냐고요? <br/>
                    그야 TTS가 대신 답해주거든요! <br/>
                </p>
            </div>
            
            <div className="third-text">
                <p className="ttext">
                    <h1>영어부터 세계 정복까지</h1>
                    세계 제 1 외국어인 영어부터 시작해서 <br/>
                    아시아, 유럽, 아프리카 등 소통 안되는 나라가 없도록 <br/>
                </p>
                <img src="./images/world_ill.svg" className="third-img" />
            </div>
            
        </>
    )
}

export default Section