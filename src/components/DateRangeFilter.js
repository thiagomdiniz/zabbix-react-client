import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function DateRangeFilter(props) {

    //const [startDate, setStartDate] = useState(null);
    //const [endDate, setEndDate] = useState(null);

    function handleFilter(date, when) {
        if (when === 'since') {
            props.setStartDate(date);
            //props.response.result = props.response.result.filter(maintenance => maintenance.active_since > dateToTimestamp(date));
            /*props.setRequestOptions({
                ...props.requestOptions,
                params: { ...props.requestOptions.params, active_since: dateToTimestamp(date).toString() }
            });*/
        } else if (when === 'till') {
            props.setEndDate(date);
            /*props.setRequestOptions({
                ...props.requestOptions,
                params: { ...props.requestOptions.params, active_till: dateToTimestamp(date) }
            });*/
        }
    }

    return (
        <div className="row">
            <div className="form-group col-md-6">
                <label htmlFor="since" className="mr-3">Since</label>
                <DatePicker
                    selected={props.startDate}
                    onChange={date => handleFilter(date, 'since')}
                    selectsStart
                    startDate={props.startDate}
                    endDate={props.endDate}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    isClearable
                    className="form-control form-control-sm"
                    placeholderText="Click to select a date"
                    id="since"
                    name="since"
                />
            </div>
            <div className="form-group col-md-6">
            <label htmlFor="till" className="mr-3">Till</label>
                <DatePicker
                    selected={props.endDate}
                    onChange={date => handleFilter(date, 'till')}
                    selectsEnd
                    startDate={props.startDate}
                    endDate={props.endDate}
                    minDate={props.startDate}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    isClearable
                    className="form-control form-control-sm"
                    placeholderText="Click to select a date"
                    id="till"
                    name="till"
                />
            </div>
        </div>
    );
}