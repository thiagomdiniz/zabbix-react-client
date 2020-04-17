import React, { useReducer } from 'react';
import Context from './helpers/Context';
import * as ACTIONS from './reducers/Actions';
import * as AuthReducer from './reducers/AuthReducer';
import Routes from './Routes';
import Auth from './helpers/Auth';

const auth = new Auth();

//const ContextState = () => {
export default function ContextState () {
    const [stateAuthReducer, dispatchAuthReducer] = useReducer(
        AuthReducer.AuthReducer,
        AuthReducer.initialState
        );

    const handleLogin = () => {
        dispatchAuthReducer(ACTIONS.loginSuccess());
    }

    const handleLogout = () => {
        dispatchAuthReducer(ACTIONS.loginFailure());
    }

    const handleAddUserdata = (userData) => {
        dispatchAuthReducer(ACTIONS.addUserdata(userData));
    }

    const handleRemoveUserdata = () => {
        dispatchAuthReducer(ACTIONS.removeUserdata());
    }

    const handleAuthentication = (props) => {
        //auth.handleAuth(props.username, props.password);
        auth.handleAuth(props.response, props.from);
    }

    return (
        <div>
            <Context.Provider
                value={{
                    authState: stateAuthReducer.isAuthenticated,
                    userDataState: stateAuthReducer.userData,
                    handleLogin,
                    handleLogout,
                    handleAddUserdata,
                    handleRemoveUserdata,
                    handleAuthentication,
                    authObj: auth
                }}>
                <Routes />
            </Context.Provider>
        </div>
    );
}

//export default ContextState;