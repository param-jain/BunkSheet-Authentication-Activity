import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    LOGIN_ATTEMPTED,
    SIGNUP_EMAIL_CHANGED,
    SIGNUP_PASSWORD_CHANGED,
    SIGNUP_VERIFY_PASSWORD_CHANGED,
    SIGNUP_F_NAME_CHANGED,
    SIGNUP_L_NAME_CHANGED,
    SIGNUP_REG_ID_CHANGED,
    SIGNUP_ATTEMPTED,
    SIGNUP_OTP_CHANGED, 
    EAN_USER_BRANCH_SELECT,
    EAN_USER_YEAR_SELECT,
    EAN_USER_DIVISION_SELECT,
    EAN_USER_BATCH_SELECT,
} from './types';

//Login Screen
export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};
export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};
export const loginUser = ({ email, password }) => {
    return {
        type: LOGIN_ATTEMPTED,
    }
};