import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from "../actions/user_actions";

const _nullSession = {
    currentUser: null
};
const SessionReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type){
        case RECEIVE_CURRENT_USER:
            const currentUser = action.user;
            newState = Object.assign({}, { currentUser });
            return newState;
        case LOGOUT_CURRENT_USER:
            newState = Object.assign({}, _nullSession);
            return newState;
        default:
            return state;
    }
}

export default SessionReducer;