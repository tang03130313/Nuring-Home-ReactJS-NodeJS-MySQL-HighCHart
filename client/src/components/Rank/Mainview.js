import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Div100vh from 'react-div-100vh'
import jwt_decode from 'jwt-decode'
import { rank } from '../UserFunctions'
import '../../index.css';
import '../css/styles.css';
import imgUrl from "../image/rank.jpg";

import Highcharts from 'highcharts' //npm install highcharts-more --save
import * as HighchartsMore from "highcharts/highcharts-more"
import Highstock from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official' //npm install highcharts-react-official
HighchartsMore(Highcharts)
HighchartsMore(Highstock)
//import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
////style={{backgroundColor: "#444444"}}
class Mainview extends Component {
    constructor() {
        super()
        this.state = {
            user: [],
            imagepath: [],
            activate_value: []
        };
        //console.log(this.props.match.params.id);
        rank().then(res => {
            //console.log(res);
            for(let i = 0;i < res.length;i++){
                //console.log(res[i].userid);
                this.state.user.push(res[i].name);
                this.state.imagepath.push(res[i].imagepath);
                this.state.activate_value.push(res[i].activate_value);
                /*this.state.name.push(res[i].name);
                this.state.blood_suger.push(res[i].blood_suger);
                this.state.blood_pressure.push(res[i].blood_pressure);
                this.state.temperature.push(res[i].temperature);
                this.state.activate.push(res[i].activate);
                this.state.sleep.push(res[i].sleep);
                this.state.imagepath.push(res[i].imagepath);*/
                this.setState(this.state)
            }
            console.log(this.state.user);
            console.log(this.state.imagepath);
            console.log(this.state.activate_value);
        })
    }
    componentDidMount() {
        
    }

    /*componentDidMount () {
        const token = localStorage.datatoken
        //const decoded = jwt_decode(token)
        this.setState({
            StagesDeep: token[0].StagesDeep,
            StagesLight: token[1].StagesLight,
            StagesRem: token[2].StagesRem,
            StagesWake: token[3].StagesWake
        })
    }*/

    render () {
        let title_rank_1,title_rank_2,title_rank_3,rank_1,rank_2,rank_3,rank_4,rank_5,rank_6,rank_7,rank_8,rank_9,rank_10;
        if(this.state.imagepath[0] != null){
            title_rank_1 = <div ><img src={this.state.imagepath[0]}  className="rank_1"/></div> 
            rank_1 = <div className="oneGuy">
                        <img src={this.state.imagepath[0]}  className="img"/> 
                        <a className="rank">1</a>
                        <a className="name">{this.state.user[0]}</a>
                        <a className="value">{this.state.activate_value[0]}</a>
                    </div>
        }
        else{
            title_rank_1 = <div></div>
            rank_1 = <div></div>
        }
        if(this.state.imagepath[1] != null){
            title_rank_2 = <div ><img src={this.state.imagepath[1]}  className="rank_2"/></div> 
            rank_2 = <div className="oneGuy">
                        <img src={this.state.imagepath[1]}  className="img"/> 
                        <a className="rank">2</a>
                        <a className="name">{this.state.user[1]}</a>
                        <a className="value">{this.state.activate_value[1]}</a>
                    </div>
        }
        else{
            title_rank_2 = <div></div>
            rank_2 = <div></div>
        }
        if(this.state.imagepath[2] != null){
            title_rank_3 = <div ><img src={this.state.imagepath[2]}  className="rank_3"/></div> 
            rank_3 = <div className="oneGuy">
                        <img src={this.state.imagepath[2]}  className="img"/> 
                        <a className="rank">3</a>
                        <a className="name">{this.state.user[2]}</a>
                        <a className="value">{this.state.activate_value[2]}</a>
                    </div>
        }
        else{
            title_rank_3 = <div></div>
            rank_3 = <div></div>
        }
        if(this.state.imagepath[3] != null)
            rank_4 = <div className="oneGuy">
                        <img src={this.state.imagepath[3]}  className="img"/> 
                        <a className="rank">4</a>
                        <a className="name">{this.state.user[3]}</a>
                        <a className="value">{this.state.activate_value[3]}</a>
                    </div>
        else
            rank_4 = <div></div>
        if(this.state.imagepath[4] != null)
            rank_5 = <div className="oneGuy">
                        <img src={this.state.imagepath[4]}  className="img"/> 
                        <a className="rank">5</a>
                        <a className="name">{this.state.user[4]}</a>
                        <a className="value">{this.state.activate_value[4]}</a>
                    </div>
        else
            rank_5 = <div></div>


        return (
            <div className="leaderboard">
              <div className="title_1 text-center">活動量</div>
              <div className="cup" style={{backgroundImage: "url(" + imgUrl + ")",backgroundSize: "cover"}}>
                {title_rank_1}
                {title_rank_2}
                {title_rank_3}
              </div>
              {rank_1}
              {rank_2}
              {rank_3}
              {rank_4}
              {rank_5}
            </div>
        )
    }
}

export default Mainview