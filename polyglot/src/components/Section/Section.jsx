import React from "react";
import "./Section.css";

const Section = () => {
    return (
        <>
            <div className="first-text">
                <p className="ftext">
                    <h1>실시간 번역, 자연스러운 대화</h1>
                    채팅으로 번역하던 시절은 안녕, <br/>
                    대화로 실시간 번역을 디스코드에서도 체험해보세요. <br/>
                    <button className="discord-btn">DISCORD</button>
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