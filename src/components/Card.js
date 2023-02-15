import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = useContext(CurrentUserContext);
    
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = ( 
        `gallery__image-like-btn ${isLiked && 'gallery__image-like-btn_active'}` 
    );

    function handleClick() {
        props.onCardClick(props.card);
    } 

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card, isLiked);
    }

    return (
        <li className="gallery__element">
            <img src={props.card.link} alt={props.card.name} className="gallery__image" onClick={handleClick}/>
            {isOwn && <button type="button" aria-label="Удалить картинку" className="gallery__delete-image-btn" onClick={handleDeleteClick}/>} 
            <div className="gallery__image-description">
                <h2 className="gallery__image-title">{props.card.name}</h2>
                <div className="gallery__like">
                    <button type="button" aria-label="Мне нравится" className={cardLikeButtonClassName} onClick={handleLikeClick}/>
                    <p className="gallery__number-of-likes">{props.card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;