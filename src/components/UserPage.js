import React, {useEffect, useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarProfile from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import AddPlacePopup from './AddPlacePopup';

function UserPage({email, handleExit}) {
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    async function setUser() {
      await api.getUserInfo()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {console.log(err)})
    }
    setUser();
    async function setData() {
      await api.getCards()
        .then((userCards) => {
            setCards(userCards);
        })
        .catch((err) => {
            console.log(err)
        })
    }
    setData();
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(clickedCard) {
    setSelectedCard(clickedCard);
  }

  function handleCardLike(card, isLiked) {
    if (!isLiked) {
        api.likeCard(card._id)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {console.log(err)});
    } else {
        api.removeLike(card._id)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {console.log(err)});
    }
}

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
      })
      .catch((err) => {console.log(err)})
  }

  function handleUpdateUser(newUserInfo) {
    api.updateUserInfo(newUserInfo.name, newUserInfo.about)
      .then((updatedUser) => {setCurrentUser(updatedUser)})
      .then(() => {closeAllPopups()})
      .catch((err) => {console.log(err)})
  }

  function handleUpdateAvatar(newAvatarInfo) {
    api.updateAvatar(newAvatarInfo.avatar)
      .then((updatedUser) => {setCurrentUser(updatedUser)})
      .then(() => {closeAllPopups()})
      .catch((err) => {console.log(err)})
  }

  function handleAddPlaceSubmit(newCard) {
    api.addCard(newCard)
      .then((card) => {setCards([card, ...cards])})
      .then(() => {closeAllPopups()})
      .catch((err) => {console.log(err)})
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header 
          text='Выйти'
          email={email}
          handleExit={handleExit}
        />
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <EditAvatarProfile isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>

        <ImagePopup
          selectedCard = {selectedCard}
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default UserPage;
