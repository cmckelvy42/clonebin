import * as PastesUtil from '../util/pastes';
import { receiveErrors } from './error_actions';

export const RECEIVE_PASTES = 'RECEIVE_PASTES';
export const RECEIVE_PASTE = 'RECEIVE_PASTE';
export const RECEIVE_NEW_PASTE = 'RECEIVE_NEW_PASTE';
export const RECEIVE_UPDATED_PASTE = 'RECEIVE_UPDATED_PASTE';
export const REMOVE_PASTE = 'REMOVE_PASTE';

export const receivePastes = (pastes) => ({
    type: RECEIVE_PASTES,
    pastes
});

export const receivePaste = (paste) => ({
    type: RECEIVE_PASTE,
    paste
});

export const receiveNewPaste = (paste) => ({
    type: RECEIVE_NEW_PASTE,
    paste
});

export const receiveUpdatedPaste = (paste) => ({
    type: RECEIVE_UPDATED_PASTE,
    paste
});

export const removePaste = (pasteId) => ({
    type: REMOVE_PASTE,
    pasteId
})

export const requestPastes = () => dispatch => (
    PastesUtil.fetchPastes().then(pastes => dispatch(receivePastes(pastes)),
    err=>dispatch(receiveErrors({responseJSON:err.responseJSON, status:err.status})))
);

export const requestPaste = id => dispatch => (
    PastesUtil.fetchPaste(id).then(paste => dispatch(receivePaste(paste)),
    err=>dispatch(receiveErrors({responseJSON:err.responseJSON, status:err.status})))
);

export const createPaste = paste => dispatch => (
    PastesUtil.createPaste(paste).then(paste => dispatch(receiveNewPaste(paste)),
    err=>dispatch(receiveErrors({responseJSON:err.responseJSON, status:err.status})))
)

export const updatePaste = paste => dispatch => (
    PastesUtil.updatePaste(paste).then(paste => dispatch(receiveUpdatedPaste(paste)),
    err=>dispatch(receiveErrors({responseJSON:err.responseJSON, status:err.status})))
)

export const destroyPaste = pasteId => dispatch => (
    PastesUtil.deletePaste(pasteId).then(() => dispatch(removePaste(pasteId)),
    err=>dispatch(receiveErrors({responseJSON:err.responseJSON, status:err.status})))
)