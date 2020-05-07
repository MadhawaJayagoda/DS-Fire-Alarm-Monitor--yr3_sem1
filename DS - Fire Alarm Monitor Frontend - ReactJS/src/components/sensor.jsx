import React, {Component} from 'react';
import {SensorContext} from "../contexts/sensorContext";
import './sensor.css';


class Sensor extends Component {
    render() {
        const {  floorNum, roomNum, alertStatus } = this.props;
        return (
            <SensorContext.Consumer>{( sensorContext ) => {
                const { onClickSensor } = sensorContext;
                /*let styleVal;
                if (alertStatus == 'GREEN' ){
                    styleVal = {
                        backgroundColor: "#008900"
                    }
                } else if( alertStatus == 'RED') {
                    styleVal = {
                        backgroundColor: "#970000"
                    }
                } else{
                    styleVal = {
                        backgroundColor: "#b5b5b5",
                        color : "#000"
                    }
                }*/
                return(
                    <button type="button" className="list-group-item list-group-item-action card-body card-title" onClick={() => onClickSensor(floorNum, roomNum)}
                        style={(alertStatus == 'GREEN' ? {backgroundColor:"#008900"}: (alertStatus == 'RED') ? {backgroundColor:"#970000"} : {backgroundColor:"#b5b5b5", color:"black"})}>
                        Sensor  floor : {floorNum}  &nbsp;&nbsp;  Room : {roomNum}
                    </button>
                );
            }}</SensorContext.Consumer>
        );
    }
}

export default Sensor;