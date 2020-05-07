import React, {Component} from 'react';
import './componentCSS/NavBar.css';

class NavBar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg py-md-3">
                    <span className='text-light'> <h2>Fire Alarm Monitoring System </h2></span>
                    <span className='fireIcon'><i className="fab fa-gripfire text-white fa-4x"></i></span>
                </nav>
            </div>
        );
    }
}

export default NavBar;