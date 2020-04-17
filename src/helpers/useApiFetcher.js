import { ZABBIX_CONFIG } from "../Config";
import { useState, useCallback } from "react";

export default function useApiFetcher() {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const url = ZABBIX_CONFIG.url;

    const callApi = async (zabbixMethod, httpMethod, params, auth) => {
        if (!zabbixMethod ||
            !httpMethod ||
            !params) {
            //setError({ message: 'Call API error: Missing parameters!' });
            return;
        }
        setError(null);
        setLoading(true);

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
                setResponse(json);
            } else if (json.error) {
                setError({ message: json.error.data });
            }
        } catch (e) {
            setError(e);
        }

        setLoading(false);
    }

    return [ { response, loading, error }, useCallback(callApi, []) ];
}