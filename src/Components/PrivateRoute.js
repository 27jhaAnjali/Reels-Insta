import React,{useContext, /*Component*/ } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { Outlet, Navigate } from 'react-router-dom'
// import Feed from './Feed';

export default function PrivateRoute() {
    const {user} = useContext(AuthContext) 
    return (
        <>
            {user ? <Outlet/> : <Navigate to="/login" />};
        </>

    )

}