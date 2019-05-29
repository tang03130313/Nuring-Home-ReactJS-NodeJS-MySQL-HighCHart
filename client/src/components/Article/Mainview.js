import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Div100vh from 'react-div-100vh'
import { home } from '../UserFunctions'
import Preview from './Preview';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
////style={{backgroundColor: "#444444"}}
var rows;
var carArray = [{ name : "Ford" , price : 15000 }, { name : "toyota" , price : 12000 } , { name : "Rover" , price : 14000 }];
class Mainview extends Component {
    constructor() {
        super()
        this.state = {
            user: []
        };
        home().then(res => {
            rows = res;
            console.log(res);
            for(let i = 0;i< res.length;i++){
                //console.log(res[i].userid);
                this.state.user.push(res[i]);
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
        })

    }
    render () {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div>
                        {
                            this.state.user.map((user) => {
                              return (
                                <div>
                                    <Preview user={user} />
                                </div>
                              );
                            })
                        }
                        
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Mainview