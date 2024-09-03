import React from "react";
import "./Section.css";

const Section = () => {
    return (
        <>
            <div className="first-text">
                <h1>실시간 번역, 자연스러운 대화</h1>
                채팅으로 번역하던 시절은 안녕, 대화로 실시간 번역을 디스코드에서도 체험해보세요. <br/>
                
                <button>
                <div className="discord">
                    <img src="./images/discord.svg"></img>
                    <p1 className="discord-text">DISCORD</p1>
                </div>
                </button>
            </div>


            <br/><br/>
            <h1>TTS로 듣는 깔끔한 음성</h1>
            어떻게 실시간 번역이 가능하냐고요? 그야 TTS가 대신 답해주거든요
            <br/><br/>
            <h1>영어부터 시작해서 쭈욱 끝까지</h1>
            많이 사용하는 영어부터 한국어, 일본어, 더 나아가 불어까지
            <br/><br/>
        </>
    )
}

export default Section