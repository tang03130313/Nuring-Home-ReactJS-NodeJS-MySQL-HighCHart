import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom' 
import { vw, vh } from 'react-native-css'
import Div100vh from 'react-div-100vh'
import jwt_decode from 'jwt-decode'
import { patient_home } from '../UserFunctions'
import constantData from './History_Sleep.json';
import Preview_1 from './Preview_1';
import Preview_2 from './Preview_2';
import Preview_3 from './Preview_3';
import _Preview_2 from './_Preview_2';
import _Preview_3 from './_Preview_3';
import Preview_4 from './Preview_4';
import Preview_5 from './Preview_5';
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
        this.onClick = this.handleClick.bind(this);
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
            chooser: 'chooser_1'
        }
        var NewArray = new Array();
　      NewArray = window.location.href.split('/');
        console.log(NewArray[NewArray.length-1]);
        const userid =  NewArray[NewArray.length-1];
        var size = 0;
        patient_home(userid).then(res => {
            console.log(res);
            //console.log(res[3] != undefined ? 1 : 0);
            this.setState({
                name: res[0] != undefined ? res[0].name : '無紀錄',
                imagepath: res[0] != undefined ? res[0].imagepath : null,
                birth: res[0] != undefined ? res[0].birth : '無紀錄',
                blood: res[0] != undefined ? res[0].blood : '無紀錄',
                disease: res[0] != undefined ? res[0].disease : '無紀錄',
                phone: res[0] != undefined ? res[0].phone : '無紀錄',
                smoke: res[0] != undefined ? res[0].smoke : '無紀錄',
                address: res[0] != undefined ? res[0].address : '無紀錄',
            })

            console.log(this.state.StagesDeep);
        })
        
    }
    componentDidMount() {
        
    }

    handleClick (e) {
        this.setState({chooser: e.target.id})
        console.log(this.state.aaa);
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
        let preview_2,preview_3;
        if(this.state.id == "67af0b6ee92a46b5a987c2e639f01720" || this.state.id == "2c1c3a34e3c142c48c2cb09b176045e5"){
            preview_2 = <_Preview_2 />
            preview_3 = <_Preview_3 />
        }
        else{
            preview_2 =  <Preview_2 />
            preview_3 = <Preview_3 />
        }
        const chooser_1 = (
            <div>
            <div className="chooser_app">
                <div id="chooser_1" className="choosed chooser_1">當前數據</div>
                <div onClick={this.handleClick.bind(this)} id="chooser_2" className="chooser_2">歷史紀錄</div>
                <div onClick={this.handleClick.bind(this)} id="chooser_3" className=" chooser_3">疾病風險</div>
                <div onClick={this.handleClick.bind(this)} id="chooser_4" className=" chooser_4">音檔</div>
                <div onClick={this.handleClick.bind(this)} id="chooser_5" className=" chooser_5">相簿</div>
            </div>
            <Preview_1 />
            </div>
        )
        const chooser_2 = (
            <div>
            <div className="chooser_app">
                <div onClick={this.handleClick.bind(this)} id="chooser_1" className=" chooser_1">當前數據</div>
                <div id="chooser_2" className="choosed chooser_2">歷史紀錄</div>
                <div onClick={this.handleClick.bind(this)} id="chooser_3" className=" chooser_3">疾病風險</div>
                <div onClick={this.handleClick.bind(this)} id="chooser_4" className=" chooser_4">音檔</div>
                <div onClick={this.handleClick.bind(this)} id="chooser_5" className=" chooser_5">相簿</div>
            </div>
            {preview_2}
            </div>
        )
        const chooser_3 = (
            <div>
            <div className="chooser_app">
                <div onClick={this.handleClick.bind(this)} id="chooser_1" className=" chooser_1">當前數據</div>
                <div onClick={this.handleClick.bind(this)} id="chooser_2" className=" chooser_2">歷史紀錄</div>
                <div id="chooser_3" className="choosed chooser_3">疾病風險</div>
                <div onClick={this.handleClick.bind(this)} id="chooser_4" className=" chooser_4">音檔</div>
                <div onClick={this.handleClick.bind(this)} id="chooser_5" className=" chooser_5">相簿</div>
            </div>
            {preview_3}
            </div>
        )
        const chooser_4 = (
            <div>
            <div className="chooser_app">
                <div onClick={this.handleClick.bind(this)} id="chooser_1" className=" chooser_1">當前數據</div>
                <div onClick={this.handleClick.bind(this)} id="chooser_2" className=" chooser_2">歷史紀錄</div>
                <div onClick={this.handleClick.bind(this)} id="chooser_3" className=" chooser_3">疾病風險</div>
                <div id="chooser_4" className="choosed chooser_4">音檔</div>
                <div onClick={this.handleClick.bind(this)} id="chooser_5" className=" chooser_5">相簿</div>
            </div>
            <Preview_4 />
            </div>
        )
        const chooser_5 = (
            <div>
            <div className="chooser_app">
                <div onClick={this.handleClick.bind(this)} id="chooser_1" className=" chooser_1">當前數據</div>
                <div onClick={this.handleClick.bind(this)} id="chooser_2" className=" chooser_2">歷史紀錄</div>
                <div onClick={this.handleClick.bind(this)} id="chooser_3" className=" chooser_3">疾病風險</div>
                <div onClick={this.handleClick.bind(this)} id="chooser_4" className=" chooser_4">音檔</div>
                <div id="chooser_5" className="choosed chooser_5">相簿</div>
            </div>
            <Preview_5 />
            </div>
        )
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
        var configs_3 = {
            chart: {
                type: 'column'
            },
            legend: {
                enabled: true,
                align: 'center',
                symbolWidth: 16,
                symbolHeight: 16,
                symbolRadius: 5,
                itemStyle:{
                    "fontSize": "14px"
                }
            },
            rangeSelector : {
                  buttons: [
                  { type: 'day', count: 1, text: '1 d'},
                  { type: 'day', count: 7, text: '1 w'},
                  { type: 'month', count: 1, text: '1 m'},
                  { type: 'month', count: 3, text: '3 m'},
                  { type: 'all', text: 'All'}
                  ],
                  selected : 5
              },
            
            title : {
                text : ''
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Minutes'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            global: {
                useUTC: false
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: true,
                filename: ""
            },
            plotOptions: {
                series: {
                    stacking: 'normal',
                    dataLabels: {
                        style: {
                            textOutline:"none"
                        },
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                }
            },
            navigator: {
                enabled: true,
                series: {
                    type: 'column'
                }
            },

            series: [
                {
                    name: 'Deep',
                    data: constantData.Deep,
                    tooltip: {
                        valueDecimals: 2
                    }
                },
                {
                    name: 'Light',
                    data: constantData.Light,
                    tooltip: {
                        valueDecimals: 2
                    }
                },
                {
                    name: 'Rem',
                    data: constantData.Rem,
                    tooltip: {
                        valueDecimals: 2
                    }
                },
                {
                    name: 'Wake',
                    data: constantData.Wake,
                    tooltip: {
                        valueDecimals: 2
                    }
                }
            ]
        }
        return (
            <div>
                <div className="basicInfo">基本資料
                    <div><img src={this.state.imagepath} className="photo"/></div>
                    <a className="text-center" style={{fontSize:"1rem"}}> {this.state.name}</a> 

                    <p>生日: {this.state.birth}</p>
                    <p>血型: {this.state.blood}</p>
                    <p>病史: {this.state.disease}</p>
                    <p>電話: {this.state.phone}</p>
                    <p>地址: {this.state.address}</p>
                </div>
                {this.state.chooser == "chooser_1" ? chooser_1 : (this.state.chooser == "chooser_2" ? chooser_2 : (this.state.chooser == "chooser_3" ? chooser_3 : (this.state.chooser == "chooser_4" ? chooser_4 : chooser_5)))}
                
            </div>
        )
    }
}

export default Mainview

/*<div>
                    
                    <div className="graphs">
                        <div style={{margin:"0 auto"}}>
                            昨日睡眠<br/>
                            <HighchartsReact highcharts = {Highcharts} options={configs} className="graph" />
                        </div>
                        <div style={{margin:"0 auto"}}>
                            昨日活動量/卡路里
                            <HighchartsReact highcharts = {Highcharts} options={configs_2}  className="graph"/>
                        </div>
                        <div style={{margin:"0 auto"}}>
                            <HighchartsReact highcharts = {Highstock} constructorType = {'stockChart'} options = {configs_3} />
                         </div>
                    </div>
                </div>*/