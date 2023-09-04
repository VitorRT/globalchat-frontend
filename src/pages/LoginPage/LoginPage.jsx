import React from "react";
import Header from "../../components/header";
import FormLogin from "../../components/form/login";

export default function LoginPage({setLogged}) {
    return (
        <>
            <Header />
            <div className="box-form">
                <FormLogin setLogged={setLogged}/>
            </div>
        </>
    )
}   