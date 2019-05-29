import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Div100vh from 'react-div-100vh'
//import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
////style={{backgroundColor: "#444444"}}
class Sidebar extends Component {
    render () {
        return (
            <div style={{backgroundColor: "#444444", height: '100vh',color: 'white'}}>
	            <ul>&nbsp;</ul>
	            <ul>&nbsp;</ul>
	            <ul class="nav-item"><Link to="/" style={{backgroundColor: "#444444", height: '100vh',color: 'white'}}>成員總覽</Link></ul>
	            <ul class="nav-item"><Link to="/rank" style={{backgroundColor: "#444444", height: '100vh',color: 'white'}}>健康排行榜</Link></ul>
	            <ul class="nav-item"><Link to="/persondata" style={{backgroundColor: "#444444", height: '100vh',color: 'white'}}>個人數據管理</Link></ul>
                <ul class="nav-item"><Link to="/test" style={{backgroundColor: "#444444", height: '100vh',color: 'white'}}>個人</Link></ul>
            </div>
        )
    }
}

export default Sidebar