import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const localUser = localStorage.getItem("userData");

export const PrivateRoute = ({ component: Component, render: Render, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            localUser ? (
                props.userData = JSON.parse(localUser) &&
                Render ? (
                    Render(props) && console.log(props)
                ) : Component ? (
                <Component {...props}/>
                ) : null
            ) : (
                console.log(props) &&
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);