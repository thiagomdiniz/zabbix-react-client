import * as ACTION_TYPES from './ActionTypes';

export const loginSuccess = () => {
    return {
        type: ACTION_TYPES.LOGIN_SUCCESS
    }
}

export const loginFailure = () => {
    return {
        type: ACTION_TYPES.LOGIN_FAILURE
    }
}

export const addUserdata = (userData) => {
    return {
        type: ACTION_TYPES.ADD_USERDATA,
        payload: userData
    }
}

export const removeUserdata = () => {
    return {
        type: ACTION_TYPES.REMOVE_USERDATA
    }
}