import Header from "./Header";
import AuthForm from "./AuthForm";

function Login({handleLogin}) {
    return (
        <div className="page">
            <Header
                text="Регистрация"
                linkURL='/sign-up'
            />
            <AuthForm
                title="Вход"
                buttonText="Войти"
                name="login"
                onLogin={handleLogin}
            />
        </div>
    );
}

export default Login;