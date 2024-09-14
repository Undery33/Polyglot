import React from "react";
import './Useweb.css'

const Useweb = () => {
    return (
        <>
            <div className="main-div">
                <div className="before-translate">
                    <button className="bf-tr-btn">선택된 언어</button>
                    <input></input>
                </div>
                <div className="after-translate">
                    <button className="aft-tr-btn">선택된 언어</button>
                    <input></input>
                </div>
            </div>
        </>
    )
}

export default Useweb