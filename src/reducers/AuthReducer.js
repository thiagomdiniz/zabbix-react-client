import * as ACTION_TYPES from './ActionTypes';

export const initialState = {
    isAuthenticated: false,
    userData: null
}

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case ACTION_TYPES.LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false
            }
        case ACTION_TYPES.ADD_USERDATA:
            return {
                ...state,
                userData: action.payload
            }
        case ACTION_TYPES.REMOVE_USERDATA:
            return {
                ...state,
                userData: null
            }
        default:
            return state
    }
}