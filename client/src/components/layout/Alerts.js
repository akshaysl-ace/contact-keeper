import React, { useContext } from 'react';
import alertContext from '../../context/alert/alertContext';


const Alerts = () => {

    const context = useContext(alertContext);

    return (
        context.alerts.length > 0 && context.alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.type}`} >
                <i className="fas fa-info-circle" /> {alert.msg}
            </div>
        ))
    );
}

export default Alerts;