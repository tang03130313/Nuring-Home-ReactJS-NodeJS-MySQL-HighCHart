import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Div100vh from 'react-div-100vh'
//import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
////style={{backgroundColor: "#444444"}}
class Login extends Component {
    render () {
        return (
            <div className="mainPanel_login">    
                <div className="jumbotron text-center">
                    <a href="/login" className="btn btn-lg btn-success"><Link to="/login" className="btn btn-lg btn-success">
                        登入
                    </Link></a>
                    &nbsp;
                    <a href="/signup" className="btn btn-lg btn-info"><Link to="/register" className="btn btn-lg btn-info">
                        登出
                    </Link></a>
                </div>
            </div>
        )
    }
}

export default Login