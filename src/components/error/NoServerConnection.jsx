import React from 'react';
import "./index.css";

export default function NoServerConnection({ message }) {
    const handleReload = () => {
        window.location.reload();
    };
    return (
        <div className="server-connection-error">
            <h1>:(</h1>
            <p>Error Code: 500 Server Interval</p>
            <p id="serverErrorMessage">{message}</p>
            <small>Espero que você entenda 💜</small>
            <button onClick={handleReload}>Try Again</button>
        </div>
    )
}