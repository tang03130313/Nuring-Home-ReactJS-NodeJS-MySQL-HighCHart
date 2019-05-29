import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom' 
import { vw, vh } from 'react-native-css'
import Div100vh from 'react-div-100vh'
import jwt_decode from 'jwt-decode'
import { patient_home } from '../UserFunctions'
import '../../index.css';
import '../css/styles.css';
//import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

import Highcharts from 'highcharts' //npm install highcharts-more --save
import * as HighchartsMore from "highcharts/highcharts-more"
import Highstock from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official' //npm install highcharts-react-official

HighchartsMore(Highcharts)
HighchartsMore(Highstock)
//var {vw, vh, vmin, vmax} = require('react-native-viewport-units');

class Mainview extends Component {
    constructor() {
        super()
        //console.log(this.props.match.params.id);
        this.state = {
            name: '',
            imagepath:'',
            birth:'',
            blood:'',
            disease:'',
            address:'',
            phone:'',
            smoke:'',
            StagesDeep: '',
            StagesLight: '',
            StagesRem: '',
            StagesWake: '',
            LightlyActiveMinutes: '',
            FairlyActiveMinutes: '',
            VeryActiveMinutes: '',
            CaloriesOut: ''
        }
        var NewArray = new Array();
　      NewArray = window.location.href.split('/');
        console.log(NewArray[NewArray.length-1]);
        const userid =  NewArray[NewArray.length-1];
        var size = 0;
        patient_home(userid).then(res => {
            console.log(res);
            console.log(res[3] != undefined ? 1 : 0);
            this.setState({
                name: res[0] != undefined ? res[0].name : '無紀錄',
                imagepath: res[0] != undefined ? res[0].imagepath : null,
                birth: res[0] != undefined ? res[0].birth : '無紀錄',
                blood: res[0] != undefined ? res[0].blood : '無紀錄',
                disease: res[0] != undefined ? res[0].disease : '無紀錄',
                phone: res[0] != undefined ? res[0].phone : '無紀錄',
                smoke: res[0] != undefined ? res[0].smoke : '無紀錄',
                address: res[0] != undefined ? res[0].address : '無紀錄',
                LightlyActiveMinutes: res[2] != undefined ? res[2].sum_1 : 0,
                FairlyActiveMinutes: res[2] != undefined ? res[2].sum_2 : 0,
                VeryActiveMinutes: res[2] != undefined ? res[2].sum_3 : 0,
                CaloriesOut: res[2] != undefined ? res[2].sum_4 : 0,
                StagesDeep:  res[3] != undefined ? res[3].StagesDeep : 0,
                StagesLight: res[3] != undefined ? res[3].StagesLight : 0,
                StagesRem:  res[3] != undefined ? res[3].StagesRem : 0,
                StagesWake: res[3] != undefined ? res[3].StagesWake : 0
                
            })

            
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
        var configs = {
            chart: {
                type: 'bar',
                height: 300,
                width: 600
            },

            title: {
                text: ''
            },

            xAxis: {
                categories: ['Sleep State']
            },

            yAxis: {
                min: 0,
                title: {
                    text: 'Total sleep time (min)'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            
            plotOptions: {
                bar: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                }
            },
            
            series: [
                {
                    name: 'Deep',
                    data: [this.state.StagesDeep]
                },
                {
                    name: 'Light',
                    data: [this.state.StagesLight]
                },
                {
                    name: 'Rem',
                    data: [this.state.StagesRem]
                },
                {
                    name: 'Wake',
                    data: [this.state.StagesWake]
                },
            ]
        }
        var configs_2 = {
            chart: {
                type: 'bar',
                marginTop: 40,
                marginBottom: 80,
                plotBorderWidth: 1,
                height: 300,
                width: 600
            },

            legend: {
                y: 15
            },

            title: {
                text: '',
            },

            xAxis: {
                categories: ['Calories','Active']
            },
        
            yAxis: [
                {
                    title: {
                        text: 'Time (min)'
                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
                },
                {
                    title: {
                        text: 'calories (kcal)'
                    },
                    opposite: true
                }
            ],

            plotOptions: {
                bar: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                }
            },

            series: [
                {
                    type: 'bar',
                    name: 'Lightly Active',
                    data: [0,this.state.LightlyActiveMinutes]
                },
                {
                    type: 'bar',
                    name: 'Fairly Active',
                    data: [0,this.state.FairlyActiveMinutes]
                },
                {
                    type: 'bar',
                    name: 'Very Active',
                    data: [0,this.state.VeryActiveMinutes]
                },
                {
                    type: 'bar',
                    name: 'Calorie',
                    data: [this.state.CaloriesOut,0],
                    dataLabels: {
                        enabled: true,
                    },
                    yAxis: 1
                }
            ]
        }
        return (
            <div>
                <div className="basicInfo">基本資料
                    <div><img src={this.state.imagepath} className="photo"/></div>
                    <p>生日: {this.state.birth}</p>
                    <p>血型: {this.state.blood}</p>
                    <p>病史: {this.state.disease}</p>
                    <p>電話: {this.state.phone}</p>
                    <p>地址: {this.state.address}</p>
                </div>
                <div className="chooser">
                    <div className="choosed">當前數據</div>
                    <div>歷史紀錄</div>
                    <div>疾病風險</div>
                    <div>音檔</div>
                    <div>相簿</div>
                </div>
                <div className="graphs">
                    <div style={{margin:"0 auto"}}>
                        昨日睡眠<br/>
                        <HighchartsReact highcharts = {Highcharts} options={configs} className="graph" />
                    </div>
                    <div style={{margin:"0 auto"}}>
                        昨日活動量/卡路里
                        <HighchartsReact highcharts = {Highcharts} options={configs_2}  className="graph"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Mainview