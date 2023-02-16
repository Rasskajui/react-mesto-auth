import Header from "./Header";
import AuthForm from "./AuthForm";

function Register({onRegister}) {
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
                onRegister={onRegister}
            />
        </div>
    );
}

export default Register;