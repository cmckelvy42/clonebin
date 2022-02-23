import { presignUrl, uploadImage } from '../util/file';
import * as UsersUtil from '../util/users';
import { receiveErrors } from './error_actions';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_USER = 'RECEIVE_USER';

const receiveCurrentUser = user => ({
    type:RECEIVE_CURRENT_USER,
    user
});

const logoutCurrentUser = () => ({
    type:LOGOUT_CURRENT_USER
});

const receiveUser = user => ({
    type:RECEIVE_USER,
    user
})

export const createNewUser = formUser => dispatch => (
    UsersUtil.createUser(formUser).then(user => dispatch(receiveCurrentUser(user)),
    err=>dispatch(receiveErrors({responseJSON:err.responseJSON, status:err.status})))
);

export const updateUser = (formUser, urls, file) => dispatch => {
    
    if (urls && file){
        return(
            uploadImage(file, urls.post_url, dispatch).then(()=>
            UsersUtil.updateUser(Object.assign(formUser, {picture_url: urls.get_url})).then(user =>
            dispatch(receiveCurrentUser(user)),
            err=>dispatch(receiveErrors({responseJSON:err.responseJSON, status:err.status}))))
        );
    } else {
        return(
            UsersUtil.updateUser(formUser).then(user => dispatch(receiveCurrentUser(user)),
            err=>dispatch(receiveErrors({responseJSON:err.responseJSON, status:err.status})))
        );
    }
};

export const deleteUser = username => dispatch => (
    UsersUtil.deleteUser(username).then(() => dispatch(logoutCurrentUser()),
    err=>dispatch(receiveErrors({responseJSON:err.responseJSON, status:err.status})))
);

export const login = formUser => dispatch => (
    UsersUtil.loginUser(formUser).then(user => dispatch(receiveCurrentUser(user)),
    err=>dispatch(receiveErrors({responseJSON:err.responseJSON, status:err.status})))
);

export const logout = () => dispatch => (
    UsersUtil.logoutUser().then(() => dispatch(logoutCurrentUser()),
    err=>dispatch(receiveErrors({responseJSON:err.responseJSON, status:err.status})))
)

export const requestUser = (username, query=null) => dispatch => (
    UsersUtil.fetchUser(username, query).then(user => dispatch(receiveUser(user)),
    err=>dispatch(receiveErrors({responseJSON:err.responseJSON, status:err.status})))
)

export const uploadProfileImage = file => dispatch => (
    presignUrl(file).then(urls => uploadImage(file, urls.post_url, dispatch),
    err=>dispatch(receiveErrors({responseJSON:err.responseJSON, status:err.status})))
)