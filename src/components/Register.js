import Header from "./Header";
import AuthForm from "./AuthForm";
import InfoTooltip from "./InfoTooltip";
import { useState } from "react";

function Register() {
    const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
    const [isErorPopupOpen, setIsErrorPopupOpen] = useState(false);

    return (
        <div className="page">
            <Header
                text="Войти"
                linkURL='/sign-in'
            />
            <AuthForm
                title="Регистрация"
                buttonText="Зарегистрироваться"
                name="register"
                setSuccessPopupOpen={setIsSuccessPopupOpen}
                setErrorPopupOpen={setIsErrorPopupOpen}
            />
            <InfoTooltip 
                name="success"
                text="Вы успешно зарегистрировались!"
                isOpen={isSuccessPopupOpen}
                onClose={() => {setIsSuccessPopupOpen(false)}}
            />
            <InfoTooltip 
                name="error"
                text="Что-то пошло не так!
                Попробуйте ещё раз."
                isOpen={isErorPopupOpen}
                onClose={() => {setIsErrorPopupOpen(false)}}
            />
        </div>
    );
}

export default Register;