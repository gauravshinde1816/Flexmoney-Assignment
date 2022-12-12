import React from 'react'

const Alerts = ({ msg, status }) => {
    return (
        <div className={`alert alert-${status}`} role="alert">
            {msg}
        </div>
    )
}

export default Alerts