import {useContext} from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
            <div className="profile__avatar-container">
                <img src={currentUser?.avatar} alt="Аватарка" className="profile__avatar"/>
                <button type="button" className="profile__avatar-overlay" onClick={props.onEditAvatar}></button>
            </div>
            <div className="profile__info">
                <h1 className="profile__name">{currentUser?.name}</h1>
                <button type="button" aria-label="Редактировать профиль" className="profile__edit-btn button" onClick={props.onEditProfile}></button>
                <p className="profile__about">{currentUser?.about}</p>
            </div>
            <button type="button" aria-label="Добавить фотографию" className="profile__add-btn button" onClick={props.onAddPlace}></button>
            </section>

            <section className="gallery" aria-label="Галерея фотографий">
            <ul className="gallery__list">
                {props.cards.map((card) => (
                            <Card 
                                card={card} 
                                key={card._id}
                                onCardClick={props.onCardClick}
                                onCardLike={props.onCardLike}
                                onCardDelete={props.onCardDelete}
                            />     
                        )
                    )
                }
            </ul>
            </section>
        </main>
    )
}

export default Main;