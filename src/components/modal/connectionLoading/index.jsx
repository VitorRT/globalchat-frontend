import React from 'react';
import { FadeLoader } from 'react-spinners';
import "./index.css";

export default function ConnectionLoading() {
    return (
        <>
            <div className="spinner-container">
                <FadeLoader color={'#6229b2'} size={10} />
                <small>Connectando ao servidor...</small>
            </div>
        </>
    )
}