import React, { useEffect ,useState } from "react";
import "./index.css";
import ChatMessage from "../chatMessage";
import api from "../../../utils/api/api";

export default function ChatScrollView({connected, messagesClient}) {
    
    const [messages, setMessages] = useState([])
    const [error, setError] = useState(false);
    const [messageError, setMessageError] = useState('');

    useEffect(() => {
        const fecthMessages = async () => {
            try {
                const response = await api.listMessages()
                if(response.status !== 200) {
                    setError(true)
                    setMessageError(response.body)
                }
                setMessages(response.body); 
                
            } catch (error) {
                setError(true)
                setMessageError("Erro ao requisitar as mensagens.")
            }
        }
        if(connected) {
            fecthMessages();
            setMessages([...messages, ...messagesClient])
        }
    }, [connected, messagesClient])

    return (
        <>
            <div className="scroll-view">
                {!messages.length ? (
                    <p id="emptyListMessage">Converse e se divirta no global chat! 💜</p>
                ) : (
                    messages.map( (m, i) =>
                        <ChatMessage message={m} key={i}/>
                    )
                )}
            </div>
        </>
    )
}