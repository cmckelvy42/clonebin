import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { requestPaste } from "../../actions/paste_actions";
import { Link } from "react-router-dom";
import { destroyPaste } from "../../actions/paste_actions";
import ErrorPage from "../Errors/error_page";
import { clearErrors } from "../../actions/error_actions";
import Moment from "moment";
import { CalendarIcon, StopwatchIcon, UserIcon } from "../../util/fontawesome_icons";

const PasteTools = ({currentUser, user, pasteId}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const deletePaste = (e) => {
        e.preventDefault();
        if (confirm("Are you sure you want to delete?")){
            dispatch(destroyPaste(pasteId)).then(()=>navigate('/'));
        }
    }

    if (currentUser != user) return null;
    return(
    <div className="paste-tools">
        <Link id="edit" to={`/pastes/${pasteId}/edit`}>Edit</Link>
        <Link to={`/`} onClick={deletePaste}>Delete</Link>
    </div>);
}
const Username = ({author}) => {
    if (author.id > 1) {
        return (
            <div className="username">
                <UserIcon/><Link to={`/u/${author?.name}`}>{author?.name}</Link>
            </div>)
    } else {
        return <div className="username"><UserIcon/>a guest</div>
    }
}

const PasteDate = ({created_at, updated_at}) => {
    const created = Moment(created_at);
    const edited = Moment(updated_at);
    if (edited.isAfter(created)) {
        return (<div className="date">
            <span title={created.format("dddd, MMMM Do YYYY, h:mm:ss a")}><CalendarIcon/>{created.format("MMMM Do YYYY")}</span>
            {' ('}
            <span title={`Last edit on: ${edited.format("dddd, MMMM Do YYYY, h:mm:ss a")}`}>edited</span>
            {') '}
            </div>);
    } else {
        return (<div className="date">
            <span title={created.format("dddd, MMMM Do YYYY, h:mm:ss a")}><CalendarIcon/>{edited.format("MMMM Do YYYY")}</span>
            </div>);
    }
}

const ShowPaste = () => {
    const {pasteId} = useParams();
    const dispatch = useDispatch();
    const paste = useSelector(state=>state.pastes[pasteId]);
    const currentUser = useSelector(state => state.session.currentUser);
    const status = useSelector(state=>state.errors.status);

    useEffect(()=>{
        dispatch(requestPaste(pasteId));
    }, [pasteId]);
    useEffect( () => () => dispatch(clearErrors()), [] );
    if (status) return <ErrorPage status={status}/>
    const expiration = paste?.expiration_date ? Moment(paste.expiration_date).fromNow() : "Never";
    return( paste ?
    <div className="content">
        <div className="post-view">
            <div className="paste-info">
                <div className="user-icon">
                    <img src={paste.author.picture_url} alt={paste.author.name}/>
                </div>
                <div className="info-bar">
                    <div className="info-top">
                        <h1>{paste.title}</h1>
                    </div>
                    <div className="info-bottom">
                        <Username author={paste.author}/>
                        <PasteDate created_at={paste.created_at} updated_at={paste.updated_at}/>
                        <div className="expire" title="When this paste gets automatically deleted"><StopwatchIcon/>{expiration}</div>
                    </div>
                </div>
            </div>
            <PasteTools currentUser={currentUser.id} user={paste.author.id} pasteId={pasteId}/>
            <textarea readOnly value={paste.content}/>
        </div>
    </div>
    :
    <div></div>);
}


export default ShowPaste;