import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import SignUpReducer from './SignUpReducer';
import EANReducer from './EANReducer';

export default combineReducers ({
    login: LoginReducer,
    signup: SignUpReducer,
    ean: EANReducer
});