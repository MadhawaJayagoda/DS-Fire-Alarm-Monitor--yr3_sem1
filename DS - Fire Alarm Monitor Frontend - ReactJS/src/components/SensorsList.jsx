import React, {Component} from 'react';
import Sensor from "./sensor";
import './componentCSS/SensorList.css';
import {SensorContext} from "../contexts/sensorContext";
import shortId from 'shortid'

class SensorsList extends Component {
    static contextType = SensorContext;
    render() {

        const { sensors } = this.context;
        let sensorList = sensors.map( (sensor) => {
            return <Sensor key={shortId.generate()} floorNum={sensor.floorNum} roomNum={sensor.roomNum} alertStatus={sensor.alertStatus}/>
        });

        return (
            <div className="list-group card">
                {sensorList}
            </div>
        );
    }
}

export default SensorsList;