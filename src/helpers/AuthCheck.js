import React, { useEffect, useContext } from 'react';
import History from './History';
import Context from './Context';

const AuthCheck = (props) => {
    const context = useContext(Context);
    const { from } = props.location.state || { from: { pathname: "/home" } };

    useEffect(() => {
        if (context.authObj.isAuthenticated()) {
            context.handleLogin();
            context.handleAddUserdata(context.authObj.userData);
            (from.pathname === '/login' || from.pathname === '/')
                ? History.replace('/home')
                : History.replace(from);
        } else {
            context.handleLogout();
            context.handleRemoveUserdata();
            History.replace('/login');
        }
    }, []);

    return (
        <div></div>
    );
}

export default AuthCheck;