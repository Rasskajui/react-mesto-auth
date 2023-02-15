import {useEffect, useRef} from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarProfile(props) {
    const avatarUrlInputRef = useRef();

    useEffect(() => {
      avatarUrlInputRef.current.value = '';
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarUrlInputRef.current.value
        })
    }

    return (
        <PopupWithForm
          name='change-avatar'
          title='Обновить&nbsp;аватар'
          isOpen={props.isOpen}
          onClose={props.onClose}
          children={(
            <>
              <input 
                type="url" 
                name="avatar" 
                className="popup__form-item popup__form-item_el_link" 
                placeholder="Ссылка на картинку" 
                required
                ref={avatarUrlInputRef}
              />
              <span className="popup__input-error input-error-avatar"></span>
            </>
          )}
          buttonText='Сохранить'
          onSubmit={handleSubmit}
        />
    )
}

export default EditAvatarProfile;