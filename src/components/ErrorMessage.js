import React from 'react';

export default function ErrorMessage(props) {
    return (
        <>
            <br/>
            <div className="alert alert-danger" role="alert">
                {props.message}
            </div>
        </>
    );
}