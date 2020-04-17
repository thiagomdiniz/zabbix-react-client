import React, { useState, useEffect, useContext } from 'react';
import useApiFetcher from '../helpers/useApiFetcher';
import './LoginForm.css';
import Context from '../helpers/Context';
import History from '../helpers/History';
import ErrorMessage from './ErrorMessage';

export default function LoginForm(props) {
    const context = useContext(Context);
    const { from } = props.location.state || { from: { pathname: "/" } };
    if (context.authObj.isAuthenticated()) setTimeout(() => { History.replace('/', { from }) }, 200);
    
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [requestOptions, setRequestOptions] = useState({});

    const [{response, loading, error}, callApi] = useApiFetcher();

    useEffect(() => {
        callApi(requestOptions.zabbixMethod, 'POST', requestOptions.params);
    }, [requestOptions, callApi]);

    function handleSubmit(e) {
        e.preventDefault();
        //context.handleAuthentication({username, password});
        let params = {
            'user': username,
            'password': password,
            'userData': true
        };

        setRequestOptions({
            zabbixMethod: 'user.login',
            params
        });

    }

    return (
        <form className="form-signin text-center" onSubmit={handleSubmit} method="POST">
            <img className="mb-4" src="/zabbix_logo.png" alt="" width="150"></img>
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

            <label htmlFor="inputUser" className="sr-only">Zabbix Username</label>
            <input type="text" onChange={e => setUsername(e.target.value)} name="username" className="form-control" placeholder="Zabbix Username" required autoFocus />

            <label htmlFor="inputPassword" className="sr-only">Zabbix Password</label>
            <input type="password" onChange={e => setPassword(e.target.value)} name="password" className="form-control" placeholder="Zabbix Password" required />

            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>

            {loading && <><br/><div className="alert alert-dark" role="alert">Loading from API...</div></>}
            {error && <ErrorMessage message={error.message}/>}
            {response && context.handleAuthentication({response}, {from}) /*<Redirect to={{pathname: "/"}} />*/}
        </form>
    );

}