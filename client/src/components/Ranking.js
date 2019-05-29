import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Div100vh from 'react-div-100vh'
import Sidebar from './Home/Sidebar';
//import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
////style={{backgroundColor: "#444444"}}
class Ranking extends Component {
    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push(`/`)
    }
    render () {
        const loginRegLink = (
            <div className="container">    
                
            </div>
        )

        const userLink = (
            <div class="row" id="row-main">
                <div class="col-md-2"  style={{backgroundColor: "#444444", height: '100vh',color: 'white'}}>
                    <Sidebar />
                </div>
                <div class="col-md-10" id="content">

                </div>
            </div>
        )
        return (
            <div>
             {localStorage.usertoken ? userLink : loginRegLink}
            </div>
        )
    }
}

export default Ranking