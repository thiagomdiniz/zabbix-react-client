import React, { useContext } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';
import Context from './helpers/Context';
import Home from './components/Home';
import AuthCheck from './helpers/AuthCheck';
import NavBar from './components/NavBar';
import History from './helpers/History';
import Maintenance from './components/Maintenance';
import LoginForm from './components/LoginForm';
import MaintenanceForm from './components/MaintenanceForm';

const PrivateRoute = ({component: Component, auth }) => (
    <Route render={props => auth === true
      ? <Component auth={auth} {...props} />
      : <Redirect to={{pathname:'/login', state: { from: props.location }}} />
    }
    />
);

export default function Routes() {
    const context = useContext(Context)

    return(
        <div>
            <Router history={History} >
                {(context.authState) ? <NavBar /> : null}
                <br />
                <br />
                <div>
                    <Switch>
                        <Route exact path='/login' component={LoginForm} />
                        <Route exact path='/' component={AuthCheck} />

                        <PrivateRoute exact path='/home'
                                    auth={context.authState}
                                    component={Home}/>
                        <PrivateRoute exact path='/maintenance'
                                    auth={context.authState}
                                    component={Maintenance}
                        />
                        <PrivateRoute exact path='/maintenance/new'
                                    auth={context.authState}
                                    component={MaintenanceForm}
                        />
                    </Switch>
                </div>
            </Router>
        </div>
    );

}