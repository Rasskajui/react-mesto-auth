function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__content">
                <button type="button" aria-label="Закрыть попап" className="popup__close-btn close-btn" onClick={props.onClose}/>
                <h2 className="popup__title">{props.title}</h2>
                <form name={`${props.name}`} className="popup__form" onSubmit={props.onSubmit}>
                    {props.children}
                    <button type="submit" className="popup__save-btn">{props.buttonText}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;