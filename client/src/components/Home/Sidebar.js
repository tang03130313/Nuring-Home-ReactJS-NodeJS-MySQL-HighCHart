import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Div100vh from 'react-div-100vh'
import '../css/styles.css';
import sidebar_1 from '../image/sidebar-1-1.jpg';
import sidebar_2 from '../image/sidebar-2-2.jpg';
//import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
////style={{backgroundColor: "#444444"}}
class Sidebar extends Component {
    render () {
        return (
            <div>
                <div className="navItem"><Link to="/"><img src={sidebar_1} /></Link></div>
                <div className="navItem"><Link to="/rank"><img src={sidebar_2} /></Link></div>
            </div>
        )
    }
}

export default Sidebar