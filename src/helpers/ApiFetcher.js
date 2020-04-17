import { ZABBIX_CONFIG } from '../Config';

export default async function ApiFetcher(zabbixMethod, httpMethod, params, auth) {
    let response = null;
    //const loading = false;
    let error = null;
    let url = ZABBIX_CONFIG.url;

    if (!zabbixMethod ||
        !httpMethod ||
        !params) {
        //setError({ message: 'Call API error: Missing parameters!' });
        return;
    }
    error = null;
    //setLoading(true);

    const requestBody = {
        "jsonrpc": "2.0",
        "method": zabbixMethod,
        "params": params,
        "id": 1
    };
    if (auth) requestBody.auth = auth;

    const requestOptions = {
        method: httpMethod,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    };
    
    try {
        const res = await fetch(url, requestOptions);
        const json = await res.json();
        if (json.result) {
            response = json;
        } else if (json.error) {
            error = { message: json.error.data };
        }
    } catch (e) {
        error = e;
    }

    //setLoading(false);

    return { response, error };

}