import {useState} from 'react';
import {Link} from 'react-router-dom';

function AuthForm(props) {

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormValue({
          ...formValue,
          [name]: value
        });
    }

    function handleRegisterSubmit(e) {
        e.preventDefault();
        props.onRegister(formValue);
    } 

    function handleLoginSubmit(e) {
        e.preventDefault();
        props.onLogin(formValue);
    } 

    return (
        <div className="form">
            <h2 className="form__title">{props.title}</h2>
            <form 
                name={props.name} 
                className="form__inputs" 
                onSubmit={props.name === 'register' ? handleRegisterSubmit : handleLoginSubmit}
            >
                <input 
                    type="email" 
                    className="form__input" 
                    name="email" 
                    placeholder="Email" 
                    required
                    value={formValue.email}
                    onChange={handleChange}
                />
                <input 
                    type="password" 
                    className="form__input" 
                    name="password" 
                    placeholder="Пароль" 
                    required
                    value={formValue.password}
                    onChange={handleChange}
                />
                <button type="submit" className="form__submit-btn">{props.buttonText}</button>
            </form>
            {props.name === "register" && <p className="form__text">Уже зарегистрированы? <Link to="/sign-in" className="form__link">Войти</Link></p>}
        </div>
    )
}

export default AuthForm;