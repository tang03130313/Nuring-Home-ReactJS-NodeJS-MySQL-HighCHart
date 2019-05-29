import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Div100vh from 'react-div-100vh'
//import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
////style={{backgroundColor: "#444444"}}
class Login extends Component {
    render () {
        return (
            <div className="container">    
                <div className="jumbotron text-center">
                    <a href="/login" class="btn btn-lg btn-success"><Link to="/login" className="btn btn-lg btn-success">
                        Login
                    </Link></a>
                    &nbsp;
                    <a href="/signup" class="btn btn-lg btn-info"><Link to="/register" className="btn btn-lg btn-info">
                        Register
                    </Link></a>
                </div>
            </div>
        )
    }
}

export default Login