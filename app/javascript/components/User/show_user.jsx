import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import React, {useEffect, useState} from "react";
import { requestUser } from "../../actions/user_actions";
import { Link } from "react-router-dom";
import { destroyPaste, requestPastes } from "../../actions/paste_actions";
import ErrorPage from "../Errors/error_page";
import { clearErrors } from "../../actions/error_actions";
import Moment from "moment";
import { CalendarIcon, PencilIcon, PrivacyIcon, XIcon } from "../../util/fontawesome_icons";
import NoticeMessages from "../Errors/notice_messages";

const sortTypes = ["title","created_at","expiration_date","privacy"]

const EditButton = ({currentUser, user, pasteId}) => {
    if (currentUser && currentUser.id === user.id){
        return (<Link to={`/pastes/${pasteId}/edit`}><PencilIcon/></Link>);
    } else {
        return (null);
    }
}

const DeleteButton = ({currentUser, user, pasteId}) => {
    const dispatch = useDispatch();
    const deletePaste = (e) => {
        e.preventDefault();
        if (confirm("Are you sure you want to delete this paste?")){
            dispatch(destroyPaste(pasteId)).then(()=>{
                dispatch(requestUser(user.name))
                dispatch(requestPastes())
            
            });
        }
    }
    if (currentUser && currentUser.id === user.id){
        return (<Link to='' onClick={deletePaste}><XIcon/></Link>);
    } else {
        return (null);
    }
}

const ShowUser = () => {
    
    const {username} = useParams();
    const [search, setSearch] = useSearchParams();
    const dispatch = useDispatch();
    const status = useSelector(state=>state.errors.status);
    const user = useSelector(state => state.user ? state.user : null);
    const currentUser = useSelector(state => state.session.currentUser);
    const [query, setQuery] = useState(null)
    let pastes = []
    useEffect(()=>{
        dispatch(requestUser(username, search.get('query')))
    }, [search.get('query')]);
    useEffect( () => () => dispatch(clearErrors()), [] );

    const sortType = (event) => {
        event.preventDefault()
        if (search.get("sort") === event.target.id){
            setSearch({sort: `-${event.target.id}`})
        } else setSearch({sort: event.target.id})
    }
    const sortPastes = (type) => {
        if (type[0] === '-'){
            type = type.slice(1, type.length)
            pastes.sort((a, b) => {
                let cmp1 = a[type] ||= 0
                let cmp2 = b[type] ||= 0
                if (type === "expiration_date" || type === "creation_date"){
                    cmp1 = Moment(cmp1).unix()
                    cmp2 = Moment(cmp2).unix()
                }
                return (cmp1 < cmp2) ? 1 : -1
            })
        } else pastes.sort((a, b) => {
            let cmp1 = a[type] ||= 0
            let cmp2 = b[type] ||= 0
            if (type === "expiration_date" || type === "creation_date"){
                cmp1 = Moment(cmp1).unix()
                cmp2 = Moment(cmp2).unix()
            }
            return (cmp1 > cmp2) ? 1 : -1
        })
    }
    if (user.pastes){
        pastes = Object.values(user?.pastes)
        const sortCategory = search.get("sort")
        if (sortTypes.includes(sortCategory) || sortTypes.includes(sortCategory?.slice(1, sortCategory?.length))){
            sortPastes(sortCategory)
        }
        if (pastes.length > 0){
            pastes = pastes.map((paste, i) => (
                <tr key={i}>
                    <td className="paste-title"><PrivacyIcon privacy={paste.privacy}/> <Link to={`/pastes/${paste.id}`}>{paste.title}</Link></td>
                    <td className="paste-date">{Moment(paste.created_at).format("MMM Do, YYYY")}</td>
                    <td className="paste-expiration">{paste.expiration_date ? Moment(paste.expiration_date).fromNow() : "Never"}</td>
                    <td className="td-right"><EditButton currentUser={currentUser} user={user} pasteId={paste.id}/>
                    <DeleteButton currentUser={currentUser} user={user} pasteId={paste.id}/></td>
                </tr>
            ))
        } else if (query) {
            pastes = <NoticeMessages messages={["No pastes matched that search."]}/>
        } else {
            pastes = <NoticeMessages messages={["This user has no pastes yet."]}/>
        }
    }
    
    if (status) return <ErrorPage status={status}/>
    
    return(
    <div className="content">
        <div className="user-view">
            <div className="user-info">
                <div className="user-icon">
                    <img src={user?.picture_url} alt={user?.name}/>
                </div>
                <div className="info-bar">
                    <div className="info-top">
                        <h1>{user?.name}'s Pastes</h1>
                    </div>
                    <div className="info-bottom">
                        <div className="date">
                            <CalendarIcon/>
                            <span
                            title={Moment(user?.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a")}>
                                {Moment(user?.created_at).fromNow()}
                            </span>
                        </div>
                    </div>
                </div>
                <form className="user-search" onSubmit={(e)=>{
                        e.preventDefault()
                        setSearch({query})
                    }
                }>
                    <input type="text" onChange={(e)=>setQuery(e.target.value)}/>
                </form>
            </div>
        </div>
        <table className="user-pastes">
            <thead>
                <tr className="column-names">
                    <th scope="col"><a onClick={sortType} id="title">title</a></th>
                    <th scope="col"><a onClick={sortType} id="created_at">creation date</a></th>
                    <th scope="col"><a onClick={sortType} id="expiration_date">expiration date</a></th>
                    <th scope="col" className="td_right">&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {pastes}
            </tbody>
        </table>
    </div>);
}


export default ShowUser;