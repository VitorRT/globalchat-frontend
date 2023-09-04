import React, { useState, useEffect } from "react";
import HeaderChat from "../components/chat/header";
import ChatScrollView from "../components/chat/chatScrollView";
import FormMessage from "../components/chat/formMessage";
import socket from "../utils/api/socket";

export default function ChatPage({ setLogged, user }) {

    const [connected, setConnected] = useState(false);  
    const [readyToMessage, setReadyToMessage] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (user) {
            socket.connectToWebSocket(user, () => {}, setMessages);
            setConnected(true)
        }
    }, [user, setLogged]);

    return (
        <>
            <HeaderChat setLogged={setLogged} user={user} />
            <ChatScrollView connected={connected} messagesClient={messages}/>
            <FormMessage connected={connected} userId={user.id} ready={setReadyToMessage} socket={socket}/>
        </>
    )
}
