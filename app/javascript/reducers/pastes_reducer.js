import { RECEIVE_PASTES, RECEIVE_PASTE, RECEIVE_NEW_PASTE, RECEIVE_UPDATED_PASTE, REMOVE_PASTE } from "../actions/paste_actions";
import { LOGOUT_CURRENT_USER } from "../actions/user_actions";

const PastesReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = Object.assign({}, state);
    switch (action.type){
        case RECEIVE_PASTES:
            delete nextState.sidebarPastes;
            return Object.assign(nextState, {sidebarPastes:Object.values(action.pastes)});
        case RECEIVE_PASTE:
            return Object.assign(nextState, {[action.paste.id]: action.paste});
        case RECEIVE_NEW_PASTE:
            return Object.assign(nextState, {[action.paste.id]: action.paste, lastPaste: action.paste.id});
        case RECEIVE_UPDATED_PASTE:
            return Object.assign(nextState, {[action.paste.id]: action.paste, lastUpdate: Date.now()});
        case REMOVE_PASTE:
            delete nextState[action.pasteId];
            return nextState;
        case LOGOUT_CURRENT_USER:
            return Object.assign({}, {sidebarPastes:state.sidebarPastes});
        default:
            return state;
    }
}

export default PastesReducer;