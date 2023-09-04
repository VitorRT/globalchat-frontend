import React, { useState, useEffect } from 'react';
import "./index.css";

export default function FormMessage({ connected, ready, userId, socket }) {
    const [messageData, setMessageData] = useState({ content: '' });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setMessageData({
            userId: userId,
            [name]: value
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(connected === null) connected = false;
        if(!messageData.content || !connected) {
            return;
        }
        ready(true)
        socket.sendMessageChat(messageData);
        setMessageData({...messageData, content: ''})
    }

    return (
        <>
            <div className="box-form-chat-message">
                <form onSubmit={onSubmit} className="form-chat-message">
                        <input
                            name="content"
                            onChange={onChangeHandler}
                            value={messageData.content}
                            placeholder='type a message...'
                            type='text'
                        />
                    <button type='submit'>Send</button>
                </form>
            </div>
        </>
    )
}
