import React from 'react';
import { Navigate } from "react-router-dom";

function ProtectedRouteElement({loggedIn, children}) {
    return (
        loggedIn ? children : <Navigate to="/sign-in" replace/>
    );
}

export default ProtectedRouteElement;