import PastesReducer from './pastes_reducer';
import SessionReducer from './session_reducer';
import UserReducer from './users_reducer';
import { combineReducers } from 'redux'
import ErrorsReducer from './errors_reducer';

const RootReducer = combineReducers({
    pastes: PastesReducer,
    session: SessionReducer,
    user: UserReducer,
    errors: ErrorsReducer
});

export default RootReducer;