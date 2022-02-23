import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Login from './Session/login';
import ShowPaste from './Pastes/show_paste'
import ShowUser from "./User/show_user";
import EditPaste from "./Pastes/edit_paste";
import ErrorPage from "./Errors/error_page";
import Signup from "./Session/signup";
import Profile from "./User/profile";
import CreatePaste from "./Pastes/create_paste";
const AppRoutes = () => {
    const authStatus = !!useSelector(state => state.session.currentUser);
        return(<Routes>
            <Route path='/' element={<CreatePaste/>}/>
            <Route path='/signup' element={authStatus ? <Navigate to="/"/> : <Signup/>}/>
            <Route path='/login' element={authStatus ? <Navigate to="/"/> : <Login/>}/>
            <Route path='/pastes/:pasteId' element={<ShowPaste/>}/>
            <Route path='/pastes/:pasteId/edit' element={authStatus ? <EditPaste/> : <ErrorPage status={401}/>}/>
            <Route path='/u/:username' element={<ShowUser/>}/>
            <Route path='/profile' element={authStatus ? <Profile/> : <Navigate to="/"/>}/>
            <Route path="*" element={<ErrorPage status={404}/>}/>
        </Routes>);
}

//add sidebar with recent pastes on every page

export default AppRoutes;