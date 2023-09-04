import React from "react";
import "./index.css";
import { BiLogOut } from 'react-icons/bi'
import { FaUserAlt } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";

export default function HeaderChat({setLogged}) {
    const navigate = useNavigate();
    function logout() {
        localStorage.removeItem('user');
        setLogged(false);
        navigate("/login");
    }
    return (
        <>
            <header className="bg-body-tertiary header-chat">
                <div className="box-header-chat">
                    <div className="left-content">
                        <BiLogOut size={28} id="logoutButton" onClick={logout}/>
                    </div>
                    <h1 id="titleHeader">Global<span>Chat</span></h1>
                    <div id="infoChat">
                        <FaUserAlt />
                        <p id="quantityUsers">10</p>
                        <p>122.22 ms</p>
                    </div>
                </div>
            </header>
            <div className="secondary-box-info-container">
                <div id="infoChatSecondary">
                    <FaUserAlt />
                    <p id="quantityUsers">10</p>
                    <p>122.22 ms</p>
                </div>
            </div>
        </>
    );
}
