import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Div100vh from 'react-div-100vh'
import Login from './Login';
import Sidebar from './Sidebar';
import Mainview from './Mainview';
import Navbar from '../Navbar';
import '../css/styles.css';
//import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
////style={{backgroundColor: "#444444"}}
var image =  require('../image/example.PNG')
class Home extends Component {
    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push(`/`)
    }
    render () {
        const loginRegLink = (
            <Login />
        )

        const userLink = (
            <div>
                <div className="logo" />
                <div className="navigator">
                    <Sidebar />
                </div>
                <div className="mainPanel">
                    <Mainview />
                    <div className="iconInfo"><img src={image} /></div>
                </div>
            </div>
        )
        return (
            
            <div>
            <div>
             <Navbar />
             </div>
             {localStorage.usertoken ? userLink : loginRegLink}
            </div>
        )
    }
}

export default Home