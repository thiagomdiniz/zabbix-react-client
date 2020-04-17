import React, { useState, useContext } from 'react';
import DateRangeFilter from './DateRangeFilter';
import { dateToTimestamp } from '../helpers/DateTimeFormat';
import AsyncSelect from 'react-select/async';
import ApiFetcher from '../helpers/ApiFetcher';
import Context from '../helpers/Context';
import History from '../helpers/History';

export default function MaintenanceForm() {

    const context = useContext(Context);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [hosts, setHosts] = useState([]);
    const [groups, setGroups] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();
        let params = {
            zabbixMethod: 'maintenance.create',
            params: {
                name,
                description,
                maintenance_type: 0,
                active_since: dateToTimestamp(startDate),
                active_till: dateToTimestamp(endDate),
                timeperiods: [{
                    timeperiod_type: 0,
                    start_date: dateToTimestamp(startDate),
                    period: (endDate - startDate) / 1000
                }],
                hostids: hosts,
                groupids: groups
            }
        }
        let { response, error } = await ApiFetcher(
            params.zabbixMethod, 'POST', params.params, context.userDataState.sessionid
        );
        if (response && response.result) {
            alert('Maintenance #' + response.result.maintenanceids + ' created.');
            History.replace('/maintenance');
        } else if (error) {
            alert(error.message);
        }
    }

    async function handleAsyncSelect(params) {
        let { response, error } = await ApiFetcher(
            params.zabbixMethod, 'POST', params.params, context.userDataState.sessionid
        );
        //return response.result.map(host => host.name);
        if (error) alert(error.message);
        return response.result;
    }

    const selectHost = (inputValue) =>
        new Promise(resolve => {
            let params = {
                zabbixMethod: 'host.get',
                params: {
                    output: ['name'],
                    search: { name: inputValue }
                }
            }
            //setTimeout(() => {
                resolve(handleAsyncSelect(params));
            //}, 1000);
        });

    const selectGroup = (inputValue) =>
        new Promise(resolve => {
            let params = {
                zabbixMethod: 'hostgroup.get',
                params: {
                    output: ['name'],
                    search: { name: inputValue }
                }
            }
            //setTimeout(() => {
                resolve(handleAsyncSelect(params));
            //}, 1000);
        });

    const handleChange = (inputValue) => {
        if (inputValue[0]['hostid']) {
            setHosts(inputValue.map(host => host.hostid));
        } else {
            setGroups(inputValue.map(group => group.groupid));
        }
    }


    return (
        <div>
            <h3 className="ml-2">New Maintenance</h3>
            <div className="w-50 p-3 m-3 border rounded bg-light">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control form-control-sm" id="name" aria-describedby="name" name="name" value={name} onChange={e => setName(e.target.value)} required autoFocus />
                    </div>
                    <div className="form-group">
                        <label htmlFor="desc">Description</label>
                        <textarea rows="2" type="text" className="form-control form-control-sm" id="desc" aria-describedby="desc" name="desc" value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                    <DateRangeFilter startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                    />
                    <div className="form-group">
                        <label htmlFor="hosts">Hosts</label>                    
                        <AsyncSelect
                            isMulti
                            loadOptions={selectHost}
                            cacheOptions
                            getOptionLabel={host => host['name']}
                            getOptionValue={host => host['hostid']}
                            name="hosts"
                            placeholder="Type to select hosts..."
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="groups">Groups</label>                    
                        <AsyncSelect
                            isMulti
                            loadOptions={selectGroup}
                            cacheOptions
                            getOptionLabel={group => group['name']}
                            getOptionValue={group => group['groupid']}
                            name="groups"
                            placeholder="Type to select groups..."
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
            </div>
        </div>
    );
}