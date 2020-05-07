import React, {Component} from "react";
import './App.css';
import NavBar from "./components/NavBar";
import SensorsList from "./components/SensorsList";
import SensorDataDisplay from "./components/sensorDataDisplay";
import sensorDataConst from './sensorData'
import {SensorContext} from "./contexts/sensorContext";


class App extends Component {
    constructor(props) {
        super(props);
    }

    /*  handleSubmitForm(e) {
          this.setState({
              inputText : e.target.value
          });
          console.log("Form submitted");
          console.log(this.state.inputText);
      }*/


    render() {
        return (
            <div>
                <NavBar/>
                <div className='contentBody'>
                    <div className='sideNav'>
                        <SensorsList />
                    </div>
                    <div className='main'>
                        <div className="container card-body">
                            <SensorDataDisplay/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default App;
