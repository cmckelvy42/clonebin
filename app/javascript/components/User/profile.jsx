import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, receiveErrors, clearFileErrors } from "../../actions/error_actions";
import { deleteUser, updateUser } from "../../actions/user_actions";
import { getCSRFToken } from "../../util/misc"
import { presignUrl } from "../../util/file";
import ErrorMessages from "../Errors/error_messages";
import $ from "jquery";

export const Profile = () => {
    const currentUser = useSelector(state => state.session.currentUser);
    const csrf_token = getCSRFToken();
    const [email, setEmail] = useState(currentUser.email);
    const [fileURLs, setFileURLs] = useState(null)
    const [file, setFile] = useState(null)
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const updateUserProfile = (user) => dispatch(updateUser(user, fileURLs, file));
    const deleteUserProfile = (userId) => dispatch(deleteUser(userId));
    const [saveSuccess, setSaveSuccess] = useState(null);
    const status = useSelector(state=>state.errors.status);

    const SaveStatus = () => {
        if (saveSuccess === null) return null;
        if (saveSuccess === true) return (<div className="save-status-success">Save sucessful</div>);
        return (<div className="save-status-error">Something went wrong</div>);
    }

    const handleInput = (type) => {
        if (type === "email"){
            return (e) => setEmail(e.target.value);
        } else if (type === "password") {
            return (e) => setPassword(e.target.value);
        }
        else return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(clearErrors());
        let user = Object.assign({}, currentUser);
        if (email?.length > 0) user = Object.assign(user, {email:email});
        if (password?.length > 0) user = Object.assign(user, {password: password});
        if (file) presignUrl(file).then(urls=>setFileURLs(urls));
        updateUserProfile(user).then(() => {
            setPassword("");
            setSaveSuccess(true)
        });
    }

    const deleteAccount = (e) => {
      e.preventDefault();
      if (confirm("Are you REALLY sure you want to delete your account?")){
        deleteUserProfile(currentUser.name);
      }
    }

    useEffect( () => () => dispatch(clearErrors()), [] );
    
    return(
        <div className = "content">
            <div className="content-title">
                My Profile
            </div>
            <ErrorMessages/>
            <SaveStatus/>
            <div className="form-frame">
                <form>
                    <input
                        type="hidden"
                        name="authenticity_token"
                        value={csrf_token}/>
                    <div className="form-left">
                        Username:
                    </div>
                    <div className="form-right">
                        {currentUser.name}
                    </div>
                    <div>
                        <label htmlFor="profile-email">Email Address</label>
                        <input
                            type="text"
                            id="profile-email"
                            value={email}
                            onChange={handleInput('email')}/>
                    </div>
                    <div>
                        <label htmlFor="profile-password">Password</label>
                        <input
                            type="password"
                            id="profile-password"
                            value={password}
                            onChange={handleInput('password')}/>
                    </div>
                    <div>
                        <input type="file" accept="image/png, image/jpeg" onChange={
                            (e)=>{
                                const uploadedFile = e.target.files[0];
                                dispatch(clearFileErrors());
                                if (["image/png", "image/jpeg"].includes(uploadedFile?.type) == false){
                                    e.target.value = null;
                                    dispatch(receiveErrors({responseJSON:{errors:
                                        ['Only files with these extensions are allowed: jpg, jpeg, png.']},
                                        status:422}))
                                } else if (uploadedFile?.size > 5000000){
                                    e.target.value = null;
                                    dispatch(receiveErrors({responseJSON:{errors:
                                        ['Maximum file size is 5MB']},
                                        status:422}))
                                } else {
                                    setFile(uploadedFile);
                                }
                            }
                        }></input>
                    </div>
                    <div className="profile-btn">
                        <button className="profile-btn"onClick={handleSubmit}>Update Profile Settings</button>
                    </div>
                </form>
                <div className="delete-account-btn">
                    <button onClick={deleteAccount}>DELETE ACCOUNT</button>
                </div>
            </div>
        </div>
    );
}

export default Profile