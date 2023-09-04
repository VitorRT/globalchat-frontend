import React, { useState } from 'react';
import "../generic.css";
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api/api';
import ModalLoading from '../../modal/loading';


export default function FormRegister({ setLogged }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    formalName: '',
    password: ''
  });

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.username || !formData.formalName || !formData.password) {
      setError(true);
      setMessageError("Por favor, preencha todos os campos.");
      return;
    }
    setLoading(true);

    try {
      const response = await api.registerUser(formData);
      if (response.error) {
        setLoading(false)
        setError(true);
        setMessageError(response.body.error);
      } else {
        setError(false);
        localStorage.setItem("user", JSON.stringify(response.body));
        setLogged(true);

        navigate("/");
      }
    } catch (error) {
      setMessageError('Erro no registro: ' + error);
    }
  };

  return (
    <>
      {loading && <ModalLoading />}
      <form onSubmit={handleSubmit} className="form-container">
        <h3>Register</h3>
        {error && <p id="error-txt">{messageError}</p>}

        <label className="form-label" htmlFor="username">Username *</label>
        <div>
          <input
            placeholder="username"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            type="text"
            className="form-input"
          />
        </div>

        <label className="form-label" htmlFor="formalName">Formal Name *</label>
        <div>
          <input
            placeholder="formal name"
            id="formalName"
            name="formalName"
            type="text"
            value={formData.formalName}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <label className="form-label" htmlFor="password">Password * </label>
        <div>
          <input
            placeholder="password"
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button type='submit' className="form-btn">Join</button>
        <p id="callToActionSignup">Já tem uma conta? <a href="/login">Entre aqui!</a></p>
      </form>
    </>
  );
}
