import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserPage from "./UserPage";
import Register from "./Register";
import Login from "./Login";
import ProtectedRouteElement from "./ProtectedRoute";
import * as auth from './Auth'

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('email@email');

    useEffect(() => {
        function tokenCheck() {
            if (localStorage.getItem('token')) {
                const jwt = localStorage.getItem('token');
                auth.getMail(jwt)
                .then((res) => {
                    if (res) {
                        setEmail(res.data.email);
                        setLoggedIn(true);
                    }
                })
            }
        }
        tokenCheck();
    }, [])

    function handleLogin(newEmail) {
        setEmail(newEmail);
        setLoggedIn(true);
    }

    function handleExit() {
        localStorage.clear('token');
        setLoggedIn(false);
        setEmail('email@email');
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                        <ProtectedRouteElement loggedIn={loggedIn}>
                            <UserPage email={email} handleExit={handleExit}/>
                        </ProtectedRouteElement>
                    }
                />
                <Route path="/sign-up" element={<Register/>}/>
                <Route path="/sign-in" element={<Login handleLogin={handleLogin}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;