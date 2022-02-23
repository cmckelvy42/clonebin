import React, {useEffect , useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Navigate } from "react-router";
import { requestPaste, updatePaste } from "../../actions/paste_actions";
import PasteForm from "./paste_form";
import ErrorPage from "../Errors/error_page";
import { clearErrors } from "../../actions/error_actions";
import ErrorMessages from "../Errors/error_messages";


    const EditPaste = () => {
        
        const {pasteId} = useParams();
        const dispatch = useDispatch();
        const [lastUpdateOld] = useState(useSelector(state => state.pastes.lastUpdate));
        const lastUpdateNew = useSelector(state => state.pastes.lastUpdate);
        const paste = useSelector(state => state.pastes[pasteId]);
        const currentUser = useSelector(state => state.session.currentUser);
        const status = useSelector(state=>state.errors.status);

        useEffect(()=>{
            dispatch(requestPaste(pasteId))
        }, []);
        useEffect( () => () => dispatch(clearErrors()), [] );

        if (status) return <ErrorPage status={status}/>
        if (lastUpdateOld != lastUpdateNew) return <Navigate to={`/pastes/${pasteId}`}/>
        
        if (paste && paste.author.id === currentUser.id){
            return( 
                <div className="content">
                    <ErrorMessages/>
                    <PasteForm
                        paste={paste}
                        formType="Edit Paste"
                        signedIn={true} 
                        submitPaste={(paste)=>{
                            dispatch(clearErrors());
                            dispatch(updatePaste(paste));
                        }}
                    />
                </div>);
        } else if (paste.author.id != currentUser.id) {
            return <ErrorPage status={403}/>
        } else return <div></div>
            
    }


export default EditPaste;