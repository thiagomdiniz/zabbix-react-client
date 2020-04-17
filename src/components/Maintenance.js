import React, { useState, useEffect, useContext} from 'react';
import useApiFetcher from '../helpers/useApiFetcher';
import TextFilter from './TextFilter';
import Context from '../helpers/Context';
import { timestampToDate, dateToTimestamp } from '../helpers/DateTimeFormat';
import DateRangeFilter from './DateRangeFilter';
import ApiFetcher from '../helpers/ApiFetcher';
import { Link } from 'react-router-dom';

export default function Maintenance() {

    const context = useContext(Context);

    const [requestOptions, setRequestOptions] = useState({
        zabbixMethod: 'maintenance.get',
        params: { output: 'extend', selectHosts: 'extend', selectGroups: 'extend' }
    });
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [{response, loading, error}, callApi] = useApiFetcher();

    useEffect(() => {
        callApi(requestOptions.zabbixMethod, 'POST', requestOptions.params, context.userDataState.sessionid);
    }, [requestOptions, callApi]);

    const startDateFilter = (maintenance) => {
        if (startDate && maintenance.active_since >= dateToTimestamp(startDate)) {
            return maintenance;
        } else if (!startDate) {
            return maintenance;
        }
    }

    const endDateFilter = (maintenance) => {
        if (endDate && maintenance.active_till <= dateToTimestamp(endDate)) {
            return maintenance;
        } else if (!endDate) {
            return maintenance;
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Delete maintenance #' + id + '?')) {
            let { response, error } = await ApiFetcher(
                'maintenance.delete', 'POST', [ id.toString() ], context.userDataState.sessionid
            );
            if (response && response.result) {
                alert('Maintenance #' + id + ' deleted.');
                callApi(requestOptions.zabbixMethod, 'POST', requestOptions.params, context.userDataState.sessionid);
            } else if (error) {
                alert(error.message);
            }
        }
    }

    return (
        <div>
            <div>
                <h3 className="ml-2">Maintenance ({response && response.result.length})</h3>
                <div className="float-right"><Link to="/maintenance/new" className="btn btn-outline-primary mx-3">New</Link></div>
            </div>
            <p>
                <button className="btn btn-outline-primary mx-3" type="button" data-toggle="collapse" data-target="#filters">
                    Filters
                </button>
            </p>
            
            <div className="collapse w-50 p-3 m-3 border rounded bg-light" id="filters">
                <TextFilter name="Name"
                    requestOptions={requestOptions}
                    setRequestOptions={setRequestOptions}
                />
                <TextFilter name="Description"
                    requestOptions={requestOptions}
                    setRequestOptions={setRequestOptions}
                />
                <DateRangeFilter startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                />
            </div>
            {loading && <p>Loading from API...</p>}
            {error && <p>{error.message}</p>}
            {response && !error && <div className="mx-3 bg-light">
                {!response.result.length ? <p>No data.</p> : null}

                <table className="table table-striped table-hover table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Active since</th>
                            <th scope="col">Active till</th>
                            <th scope="col">Hosts</th>
                            <th scope="col">Groups</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {response.result.filter(
                            (maintenance) => (startDateFilter(maintenance) && endDateFilter(maintenance))
                        ).map((maintenance) => (
                        <tr key={maintenance.maintenanceid}>
                            <th scope="row">{maintenance.maintenanceid}</th>
                            <td>{maintenance.name}</td>
                            <td>{maintenance.description}</td>
                            <td>{timestampToDate(maintenance.active_since)}</td>
                            <td>{timestampToDate(maintenance.active_till)}</td>
                            <td>
                                {maintenance.hosts.map((host) => (
                                    <span key={host.hostid} className="badge badge-pill badge-secondary">{host.name}</span>
                                ))}
                            </td>
                            <td>
                                {maintenance.groups.map((group) => (
                                    <span key={group.groupid} className="badge badge-pill badge-secondary">{group.name}</span>
                                ))}
                            </td>
                            <td>
                                <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(maintenance.maintenanceid)}>x</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>

            </div>}
        </div>
    );
}