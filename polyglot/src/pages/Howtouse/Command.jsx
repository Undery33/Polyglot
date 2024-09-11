import React from "react";
import './Command.css'


const Command = () => {
    return (
        <>
        <div className="cmd-info">
            <h1>명령어 소개</h1>
            아래 명령어를 이용하여 PolyGlot을 라이브로 이용해보세요!<br/>
            만약 사용하다 오류 및 버그가 발견되면 아래 버튼을 이용하여 지원 받을 수 있습니다.<br/>
            <button className="issue-btn">
                지원
            </button>
        </div>

        <div className="cmd">
            표1, 표2 등 표를 만들어 만든 명령어 정리하기
        </div>
        </>
    )
}

export default Command