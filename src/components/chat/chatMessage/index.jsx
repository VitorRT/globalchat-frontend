import React from 'react';
import "./index.css";

export default function ChatMessage({message}) {
    return(
        <>
            <div className='message-container'>
                <span id="usernameChat">{message.user.username}:</span>
                <p id="messageContent">{message.content}</p>
            </div>
        </>
    )
}