import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CurrentUserContext from '../contexts/CurrentUserContext';
import Register from "./Register";
import Login from "./Login";
import ProtectedRouteElement from "./ProtectedRoute";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarProfile from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import api from '../utils/Api';
import * as auth from '../utils/Auth'

function App() {

    const [currentUser, setCurrentUser] = useState(null);
    const [cards, setCards] = useState([]);

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

    const [selectedCard, setSelectedCard] = useState(null);

    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('email@email');

    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [infoTooltipText, setIsInfoTooltipText] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const jwt = localStorage.getItem('token');
        if (jwt) {
            auth.getMail(jwt)
            .then((res) => {
                if (res) {
                    setEmail(res.data.email);
                    setLoggedIn(true);
                    navigate('/', {replace: true});
                }
            })
            .catch((err) => {console.log(err)})
        }
    }, []);

    useEffect(() => {
        async function setUser() {
            await api.getUserInfo()
              .then((user) => {
                setCurrentUser(user);
              })
              .catch((err) => {console.log(err)})
          }
        async function setData() {
            await api.getCards()
              .then((userCards) => {
                  setCards(userCards);
              })
              .catch((err) => {
                  console.log(err)
              })
        }

        if (loggedIn) {
            setUser();
            setData();
        }

    }, [loggedIn]);

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

    function openInfoTooltip(isSuccessfull) {
        isSuccessfull 
        ? setIsInfoTooltipText('Вы успешно зарегистрировались!') 
        : setIsInfoTooltipText('Что-то пошло не так! Попробуйте ещё раз.');
        setIsSuccess(isSuccessfull);
        setIsInfoTooltipOpen(true);
    }

    function handleRegister(formValue) {
        auth.register(formValue)
            .then(() => {
                openInfoTooltip(true);
            })
            .then(() => {
                navigate('/sign-in');
            })
            .catch(() => {
                openInfoTooltip(false);
            })
    }

    function handleLogin(formValue) {
        auth.login(formValue)
            .then(() => {
                setEmail(formValue.email);
                setLoggedIn(true);
            })
            .then(() => {
                navigate('/', {replace:true})
            })
            .catch(() => {
                openInfoTooltip(false);
            })
    }

    function handleExit() {
        localStorage.clear('token');
        setLoggedIn(false);
        setEmail('email@email');
    }

    return (
        <>
            <Routes>
                <Route path="/" element={
                        <ProtectedRouteElement loggedIn={loggedIn}>
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

                                    <EditProfilePopup 
                                        isOpen={isEditProfilePopupOpen} 
                                        onClose={closeAllPopups} 
                                        onUpdateUser={handleUpdateUser}
                                    />

                                    <EditAvatarProfile 
                                        isOpen={isEditAvatarPopupOpen} 
                                        onClose={closeAllPopups} 
                                        onUpdateAvatar={handleUpdateAvatar}
                                    />
                                    <AddPlacePopup 
                                        isOpen={isAddPlacePopupOpen} 
                                        onClose={closeAllPopups} 
                                        onAddPlace={handleAddPlaceSubmit}
                                    />

                                    <ImagePopup
                                        selectedCard = {selectedCard}
                                        onClose={closeAllPopups}
                                    />

                                </div>
                            </CurrentUserContext.Provider>
                        </ProtectedRouteElement>
                    }
                />
                <Route path="/sign-up" element={<Register onRegister={handleRegister}/>}/>
                <Route path="/sign-in" element={<Login handleLogin={handleLogin}/>}/>
            </Routes>

            <InfoTooltip
                isSuccess={isSuccess}
                text={infoTooltipText}
                isOpen={isInfoTooltipOpen}
                onClose={() => {setIsInfoTooltipOpen(false)}}
            />

        </>
    );
}

export default App;