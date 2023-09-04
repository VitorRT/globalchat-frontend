import React from 'react';
import "./index.css";
import { DotLoader } from 'react-spinners';

export default function ModalLoading() {

    return (
        <>
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="spinner">
                        <DotLoader color={'#fff'} size={70} />
                    </div>
                </div>
            </div>
        </>
    )
}