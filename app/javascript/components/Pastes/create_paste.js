import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router";
import { createPaste } from "../../actions/paste_actions";
import ErrorMessages from "../Errors/error_messages";
import PasteForm from "./paste_form";
import { clearErrors } from "../../actions/error_actions";


const CreatePaste = () => {
    const dispatch = useDispatch();
    const [lastPasteOld] = useState(useSelector(state => state.pastes.lastPaste));
    const lastPasteNew = useSelector(state => state.pastes.lastPaste);
    const currentUser = useSelector(state => state.session.currentUser);
    const paste = {
        content: "",
        title: "",
        expiration_selection:0,
        privacy:0
      }
    useEffect( () => () => dispatch(clearErrors()), [] );
    if (lastPasteOld != lastPasteNew) return <Navigate to={`/pastes/${lastPasteNew}`}/>
    return (<div className="content">
            <ErrorMessages/>
            <PasteForm
            paste={paste}
            formType="New Paste"
            signedIn={!!currentUser} 
            submitPaste={(paste)=>{
              dispatch(clearErrors())
              dispatch(createPaste(paste))
            }}/>
            </div>);
}
export default CreatePaste;