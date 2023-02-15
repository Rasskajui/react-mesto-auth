import { useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const user = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(user? user.name:'');
        setDescription(user? user.about : '');
    }, [user, isOpen]);

    function handleChange(e) {
        e.target.name === 'name' ? setName(e.target.value) : setDescription(e.target.value);
    } 

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
          });
    }

    return (
        <PopupWithForm
          name='edit-profile'
          title='Редактировать&nbsp;профиль'
          isOpen={isOpen}
          onClose={onClose}
          children={(
            <>
              <input 
                type="text" 
                name="name" 
                className="popup__form-item popup__form-item_el_name" 
                placeholder="Имя пользователя" 
                minLength="2" 
                maxLength="40" 
                required
                value={name}
                onChange={handleChange}
              />
              <span className="popup__input-error input-error-name"></span>
              <input 
                type="text" 
                name="about" 
                className="popup__form-item popup__form-item_el_about" 
                placeholder="Род деятельности" 
                minLength="2" 
                maxLength="200" 
                required
                value={description}
                onChange={handleChange}
              />
              <span className="popup__input-error input-error-about"></span>
            </>
          )}
          buttonText='Сохранить'
          onSubmit={handleSubmit}
        />
    )
}

export default EditProfilePopup;