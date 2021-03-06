import { LOGIN_USER, REGISTER_USER } from "../_action/types";

export default function user_reducer (state = {}, action){
    switch(action.type){
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload}
        default:
            return state;
    }
};