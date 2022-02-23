import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestPastes } from "../../actions/paste_actions";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import Moment from "moment";
import { GlobeIcon } from "../../util/fontawesome_icons";

const generateSidebarElements = (pastes) => {
    const ret = [];
    if (!pastes) return null;
    pastes.forEach((paste, i) => {
        ret.unshift(<li key={i}><GlobeIcon/><Link to={`/pastes/${paste.id}`}>{paste.title}</Link>
        <div className="details">{Moment(paste.created_at).fromNow()}</div></li>)
    });
    return ret;
}

export const Sidebar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const pastes = useSelector(state => state.pastes.sidebarPastes);
    const [render, setRender] = useState(true);
    useEffect(()=>{
        dispatch(requestPastes())
    }, [location.pathname]);
    useEffect(()=>setRender(window.innerWidth >= 730), [window.innerWidth])
    if (render){
        return(
            <div className="sidebar-container">
                <div className="sidebar-title">
                    Recent Pastes
                </div>
                <ul>
                    {generateSidebarElements(pastes)}
                </ul>
            </div>)
    } else return null;
}

export default Sidebar;