import { RECEIVE_ERRORS } from "../actions/error_actions";
import { CLEAR_ERRORS } from "../actions/error_actions";
import { CLEAR_FILE_ERRORS } from "../actions/error_actions";

const ErrorsReducer = (state = {}, action) => {
    Object.freeze(state);
    const newState = Object.assign({}, state);
    switch (action.type){
        case RECEIVE_ERRORS:
            if (newState.errors)
            {
                newState.errors.push(...action.err.responseJSON.errors);
            } else {
                newState.errors = action.err.responseJSON.errors;
            }
            newState.status = action.err.status;
            return newState;
        case CLEAR_ERRORS:
            return {};
        case CLEAR_FILE_ERRORS:
            newState.errors = newState.errors?.filter(ele => ele.includes("file") == false);
            console.log(newState.errors);
            return newState;
        default:
            return state;
    }
}

export default ErrorsReducer;