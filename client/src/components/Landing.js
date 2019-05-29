import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Div100vh from 'react-div-100vh'
//import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
////style={{backgroundColor: "#444444"}}
class Landing extends Component {
    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push(`/`)
    }
    render () {
        const loginRegLink = (
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

        const userLink = (
            <div class="row" id="row-main">
                <div class="col-md-2"  style={{backgroundColor: "#444444", height: '100vh',color: 'white'}}>
                    <ul>&nbsp;</ul>
                    <ul>&nbsp;</ul>
                    <ul class="nav-item">成員總攬</ul>
                    <ul class="nav-item">健康排行榜</ul>
                    <ul class="nav-item">個人數據管理</ul>
                </div>
                <div class="col-md-10" id="content">
                <div className="container">
                    <div className="jumbotron mt-5">
                        <div className="col-sm-8 mx-auto">
                            <h1 className="text-center">WELCOME</h1>
                        </div>
                    </div>
                </div>
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

export default Landing