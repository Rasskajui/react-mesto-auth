import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [pictureName, setPictureName] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');

    useEffect(() => {
      setPictureName('');
      setPictureUrl('');
    }, [props.isOpen]);

    function handleChange(e) {
        e.target.name === 'picture-name' ? setPictureName(e.target.value) : setPictureUrl(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: pictureName,
            link: pictureUrl
        });
    }

    return (
        <PopupWithForm
          name='add-picture'
          title='Новое&nbsp;место'
          isOpen={props.isOpen}
          onClose={props.onClose}
          children={(
            <>
              <input 
                type="text" 
                name="picture-name" 
                className="popup__form-item popup__form-item_el_card-name" 
                placeholder="Название" 
                minLength="2" 
                maxLength="30" 
                required
                value={pictureName}
                onChange={handleChange}
              />
              <span className="popup__input-error input-error-picture-name"></span>
              <input 
                type="url" 
                name="picture-link" 
                className="popup__form-item popup__form-item_el_link" 
                placeholder="Ссылка на картинку" 
                required
                value={pictureUrl}
                onChange={handleChange}
              />
              <span className="popup__input-error input-error-picture-link"></span>
            </>
          )}
          buttonText='Создать'
          onSubmit={handleSubmit}
        />
    )
}

export default AddPlacePopup;