import React from 'react';
import Header from '../../components/header';
import FormRegister from '../../components/form/register';

export default function RegisterPage({setLogged}) {
    return(
        <>
            <Header />
            <div className="box-form">
                <FormRegister setLogged={setLogged}/>      
            </div>
        </>
    )
}