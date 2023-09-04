import React, { useState } from "react";
import "../generic.css";
import api from "../../../utils/api/api";
import { useNavigate } from "react-router-dom";
import ModalLoading from "../../modal/loading";

export default function FormLogin({ setLogged }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [messageError, setMessageError] = useState("");


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (!formData.username || !formData.password) {
            setError(true);
            setMessageError("Por favor, preencha todos os campos.");
            return;
        } 
        setLoading(true);

        try {
            const response = await api.login(formData);
            if (response.error) {
                setLoading(false)
                setError(true);
                setMessageError("credenciais erradas.");
            } else {
                setError(false);
                localStorage.setItem("user", JSON.stringify(response.body));
                setLogged(true);
                navigate("/");
            }
        } catch (error) {
            console.error('Erro no autenticação:', error);
        }
    }

    return (
        <>
            {loading && <ModalLoading />}
            <form onSubmit={onSubmit} className="form-container">
                <h3>Login</h3>
                {error && <p id="error-txt">{messageError}</p>}

                <label className="form-label" htmlFor="username">Username</label>
                <div>
                    <input
                        placeholder="username"
                        id="username"
                        name="username"
                        type="text"
                        onChange={handleChange}
                        value={formData.username}
                        className="form-input"
                    />
                </div>

                <label className="form-label" htmlFor="password">Password</label>
                <div>
                    <input
                        placeholder="password"
                        id="password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        value={formData.password}
                        className="form-input"
                    />
                </div>
                <button type="submit" className="form-btn">Join</button>
                <p id="callToActionSignup">Não tem uma conta? <a href="/register">Crie uma!</a></p>
            </form>
        </>
    )
}