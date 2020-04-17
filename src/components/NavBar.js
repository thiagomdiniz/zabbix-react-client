import React, { useContext } from 'react';
import Context from '../helpers/Context';
import { Link } from 'react-router-dom';

export default function NavBar() {

    const context = useContext(Context);

        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                <a className="navbar-brand" href="/">Zabbix</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsDefault" aria-controls="navbarsDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsDefault">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to='/maintenance'>
                                Maintenance
                            </Link>
                        </li>
                    </ul>
                    { context.authState
                    ? <>
                        <span className="navbar-text mr-sm-2">
                            {context.userDataState.alias} {context.userDataState.name ? '(' + context.authObj.getFullName() + ')' : null}
                        </span>
                        <button onClick={() => context.authObj.logout()} className="btn btn-outline-secondary my-2 my-sm-0" type="button">Sign Out</button>
                      </>
                    : null
                    }
                </div>
            </nav>
        );

}