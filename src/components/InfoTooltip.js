import Cross from '../images/infoTooltip/cross.svg';
import Check from '../images/infoTooltip/check.svg';

function InfoTooltip(props) {
    return (
        <div className={`popup popup_type_info-tooltip ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__content">
                <button type="button" aria-label="Закрыть попап" className="popup__close-btn close-btn" onClick={props.onClose}/>
                <div className="popup__info-container">
                    <img src={props.isSuccess ? Check : Cross} alt={props.isSuccess ? "Галочка" : "Крестик"} className="popup__icon"/>
                    <h2 className="popup__text">{props.text}</h2>   
                </div>
            </div>
        </div>
    )
}

export default InfoTooltip;