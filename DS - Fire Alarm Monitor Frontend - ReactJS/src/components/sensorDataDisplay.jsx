import React, {Component} from 'react';
import './componentCSS/sensorDataDisplay.css';
import {SensorContext} from "../contexts/sensorContext";

class SensorDataDisplay extends Component {

    static contextType = SensorContext;
    render() {
        const { displayData } = this.context;
        return (
            <div className='displayCard'>
                <div className="sensorDetails card">
                    <div className="card-header">
                        Sensor Data
                    </div>
                    <div className="card-body sensorDetails">
                        <p className="card-text">
                            Floor Number : {displayData.floorNum}
                        </p>
                        <p className="card-text">
                            Room Number : {displayData.roomNum}
                        </p>
                        <p className="card-text">
                            Smoke Level : {displayData.smokeLevel}
                        </p>
                        <p className="card-text">
                            CarbonDioxide Level : {displayData.carbondioxideLevel}
                        </p>
                        <p className="card-text">
                            Sensor Status : {displayData.sensorStatus}
                        </p>
                        <p className="card-text">
                            Alert Status : {displayData.alertStatus}
                        </p>
                        <p className="card-text">
                            Last recorded Data and Time : {displayData.recordedDateAndTime}
                        </p>
                    </div>
                </div>
                <br/>
                <br/>
                <div className="card">
                    <div className="card-header">
                        Contact Details
                    </div>
                    <div className="card-body contactDetails">
                        <p className="card-text">
                            Contact Name : {displayData.ownerName}
                        </p>
                        <p className="card-text">
                            Email : {displayData.email}
                        </p>
                        <p className="card-text">
                            Phone Number : {displayData.phoneNumber}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default SensorDataDisplay;