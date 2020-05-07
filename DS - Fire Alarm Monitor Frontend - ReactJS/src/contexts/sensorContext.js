import React, {Component , createContext} from 'react';

export const SensorContext = createContext();

class SensorContextProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sensorsBackend : [

            ],

            sensors:[

            ],

            currentSensor: {
                floorNum: 0,
                roomNum: 0,
                smokeLevel: 0,
                carbondioxideLevel: 0,
                sensorStatus: '',
                alertStatus: '',
                ownerName: '',
                email: '',
                phoneNumber: ''
            },

            displayData: {
                floorNum: 0,
                roomNum: 0,
                smokeLevel: 0,
                carbondioxideLevel: 0,
                sensorStatus: '',
                alertStatus: '',
                ownerName: '',
                email: '',
                phoneNumber: '',
                recordedDateAndTime: ''
            }
    };
        this.handleOnClick = this.handleOnClick.bind(this);
        this.callAPI = this.callAPI.bind(this);
        this.regularCallAPI = this.regularCallAPI.bind(this);

    }

    handleOnClick = (floor, room) => {
        console.log("Sensors from backend : ", this.state.sensors );

        console.log("floor number", floor, ",  room numbner : ", room);

        let sensors = [...this.state.sensors];
        let sensorSelected = sensors.filter(function (sensor) {
            return (sensor.roomNum == room && sensor.floorNum == floor);
        });
        console.log("Sensor filtered : ", sensorSelected);
        sensorSelected.length = 1;
        sensorSelected = sensorSelected[0];
        console.log(sensorSelected);
        this.setState({
            displayData: {
                floorNum: sensorSelected.floorNum,
                roomNum: sensorSelected.roomNum,
                smokeLevel: sensorSelected.smokeLevel,
                carbondioxideLevel: sensorSelected.carbondioxideLevel,
                sensorStatus: sensorSelected.sensorStatus,
                alertStatus: sensorSelected.alertStatus,
                ownerName: sensorSelected.ownerName,
                email: sensorSelected.email,
                phoneNumber: sensorSelected.phoneNumber,
                recordedDateAndTime : sensorSelected.recordedDateAndTime
            }
        });
    };

    async callAPI(){
        const url = "http://localhost:3000/sensorData";
        await fetch(url).then( res =>  res.json()).then( res => this.setState({ sensorsBackend : res}));
        //console.log("Data from Backend : ", this.state.sensorsBackend);
        let updatedSensors = this.state.sensorsBackend.map( sensor => {
                return {
                    floorNum: sensor.floor_no,
                    roomNum: sensor.room_no,
                    smokeLevel: sensor.smoke_level,
                    carbondioxideLevel: sensor.carbondioxide_level,
                    sensorStatus: sensor.sensor_status,
                    alertStatus: sensor.alert_status,
                    ownerName: sensor.owner_name,
                    email: sensor.email,
                    phoneNumber: sensor.phone_number,
                    recordedDateAndTime: new Date(sensor.created_date).toLocaleString()
                }
        });
        //console.log("Storing data to the state : ", updatedSensors);
        this.setState({ sensors: updatedSensors });
        console.log("API call sent to the server");

    }

    async regularCallAPI(){
        let result;
        const url = "http://localhost:3000/sensorData";
        await fetch(url).then( res =>  res.json()).then( res => { result = res});
        console.log("Regular Data from Backend : ", result);
        let updatedSensors = result.map( sensor => {
            return {
                floorNum: sensor.floor_no,
                roomNum: sensor.room_no,
                smokeLevel: sensor.smoke_level,
                carbondioxideLevel: sensor.carbondioxide_level,
                sensorStatus: sensor.sensor_status,
                alertStatus: sensor.alert_status,
                ownerName: sensor.owner_name,
                email: sensor.email,
                phoneNumber: sensor.phone_number,
                recordedDateAndTime: new Date(sensor.created_date).toLocaleString()
            }
        });
        await this.setState({ sensors: updatedSensors });
        console.log("sensor state updated ...");
        console.log("timerId :", this.timerId);
    }

    timerId = setInterval(() => { this.regularCallAPI() }, 15000);

    componentWillMount() {
        this.callAPI();
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    render() {
        return (
            <div>
                <SensorContext.Provider value={{sensors: [...this.state.sensors], displayData: {...this.state.displayData}, onClickSensor: this.handleOnClick}}>
                    {this.props.children}
                </SensorContext.Provider>
            </div>
        );
    }
}

export default SensorContextProvider;