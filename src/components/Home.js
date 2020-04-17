import React, { useContext, useEffect } from 'react';
import Context from '../helpers/Context';
import useApiFetcher from '../helpers/useApiFetcher';

export default function Home() {
    const context = useContext(Context);

    const [{response, loading, error}, callApi] = useApiFetcher();

    useEffect(() => {
        callApi('apiinfo.version', 'POST', []);
    }, []);

    return (
        <main role="main" className="container">
            <div className="jumbotron">
                <h1>Hello {context.userDataState.alias} {context.userDataState.name ? '(' + context.authObj.getFullName() + ')' : null} !</h1>
                <p className="lead">Welcome to the custom Zabbix frontend.</p>
                {loading && <p>Loading API version...</p>}
                {error && <p>{error.message}</p>}
                {response && !error && <p>
                        Your Zabbix API version is {response.result}.
                    </p>
                }
            </div>
        </main>
    );
}