import React from 'react'
import './PopUp.css'
import ReactDom from 'react-dom'

const PopUp = ({trigger, setTrigger,msg,link,sign, id }) => {
    return (trigger)? ReactDom.createPortal(
        <>
        <div className="popup">
            <div className="inner">
                <h1>Message Information</h1>
                <button onClick={setTrigger}>close</button>
                <div class="messages">
                    <h1>Message: {msg}</h1>
                    <br></br>
                    <h1>Link: {link}</h1>
                    <br></br>
                    <h1 class="size-text">Signature: {sign}</h1>
                    <h1>id: {id}</h1>
                </div>
                
            </div>
        </div>
        </>,
        document.getElementById('portal')
    ):"";
}

export default PopUp
