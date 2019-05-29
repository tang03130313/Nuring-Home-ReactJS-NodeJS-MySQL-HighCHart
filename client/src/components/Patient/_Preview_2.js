import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import '../../index.css';
import constantData from './_History_Sleep.json';
import _constantData from './_History_Sleep.json';
import constantData_2 from './_History_ActiveCalories.json';
import _constantData_2 from './_History_ActiveCalories.json';
import constantData_3 from './_History_BloodSugarPressure.json';
import _constantData_3 from './_History_BloodSugarPressure.json';
import { patient_1 } from '../UserFunctions'

import Highcharts from 'highcharts' //npm install highcharts-more --save
import * as HighchartsMore from "highcharts/highcharts-more"
import Highstock from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official' //npm install highcharts-react-official


HighchartsMore(Highcharts)
HighchartsMore(Highstock)

var NewArray = new Array();
NewArray = window.location.href.split('/');
const userid =  NewArray[NewArray.length-1];

class Preview_2 extends Component {
    constructor() {
        super()
        this.state = {
            width: Number(document.body.clientWidth*0.5),
            height: Number(document.body.clientWidth*0.3),
            textsize: Number(document.body.clientWidth*0.001),
            id : userid
            
        }
        
    }

    render () {
        
        var configs_1 = {
            chart: {
                type: 'column',
                width: this.state.width,
                height: this.state.height
            },
            legend: {
                enabled: true,
                align: 'center',
                symbolWidth: 10,
                symbolHeight: 10,
                symbolRadius: 5,
                itemStyle:{
                    "fontSize": "0.8rem"
                }
            },
            rangeSelector : {
                  buttons: [
                  { type: 'day', count: 1, text: '1 d', fontSize: "0rem"},
                  { type: 'day', count: 7, text: '1 w'},
                  { type: 'month', count: 1, text: '1 m'},
                  { type: 'month', count: 3, text: '3 m'},
                  { type: 'all', text: 'All'}
                  ],
                  selected : 5
              },
            
            title : {
                text : '',
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Minutes'
                },
                stackLabels: {
                    enabled: false,
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
                        enabled: false,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                }
            },
            navigator: {
                enabled: true,
                series: {
                    type: 'column',
                },
                width: this.state.width/20,
                height: this.state.width/20
            },

            series: [
                {
                    name: 'Deep',
                    data: constantData.Deep
                },
                {
                    name: 'Light',
                    data: constantData.Light
                },
                {
                    name: 'Rem',
                    data: constantData.Rem
                },
                {
                    name: 'Wake',
                    data: constantData.Wake
                }
            ]
        }
        var configs_2 = {
            chart: {
                type: 'column',
                width: this.state.width,
                height: this.state.height
            },
            legend: {
                enabled: true,
                align: 'center',
                symbolWidth: 10,
                symbolHeight: 10,
                symbolRadius: 5,
                itemStyle:{
                    "fontSize": "0.8rem"
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
                title: {
                    text: 'Minutes'
                },
                stackLabels: {
                    enabled: false,
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
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        style: {
                            textOutline:"none"
                        },
                        enabled: false,
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'white'
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
                    name: 'LightlyActiveMinutes',
                    data: constantData_2.Light
                },
                {
                    name: 'FairlyActiveMinutes',
                    data: constantData_2.Fairly
                },
                {
                    name: 'VeryActiveMinutes',
                    data: constantData_2.Very
                }
            ]
        }
         var configs_3 = {
            chart: {
                type: 'line',
                width: this.state.width,
                height: this.state.height
            },                      
            legend: {
                enabled: true,
                align: 'center',
                symbolWidth: 10,
                symbolHeight: 10,
                symbolRadius: 5,
                itemStyle:{
                    "fontSize": "0.8rem"
                }
            },
            rangeSelector : {
                  buttons: [
                  { type: 'day', count: 1, text: '1 day'},
                  { type: 'day', count: 7, text: '1w'},
                  { type: 'month', count: 1, text: '1m'},
                  { type: 'month', count: 3, text: '3m'},
                  { type: 'all', text: 'All'}
                  ],
                  selected : 5
            },
            
            title : {
                text : ''
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
            navigator: {
                enabled: true,
                series: {
                    type: 'line'
                }
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: false,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'gray'
                    }
                }
            },
            series: [
                {
                    name: 'Calories',
                    data: constantData_2.Calorie
                }
            ]
        }
        var configs_4 = {
            chart: {
                type: 'line',
                width: this.state.width,
                height: this.state.height
            },
            legend: {
                enabled: true,
                align: 'center',
                symbolWidth: 10,
                symbolHeight: 10,
                symbolRadius: 5,
                itemStyle:{
                    "fontSize": "0.8rem"
                }
            },
            rangeSelector : {
                  buttons: [
                  { type: 'day', count: 1, text: '1 day'},
                  { type: 'day', count: 7, text: '1w'},
                  { type: 'month', count: 1, text: '1m'},
                  { type: 'month', count: 3, text: '3m'},
                  { type: 'all', text: 'All'}
                  ],
                  selected : 5
            },
            
            title : {
                text : ''
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
            navigator: {
                enabled: true,
                series: {
                    type: 'line'
                }
            },

            series: [
                {
                    name: 'SystolicBloodPressure',
                    color: 'red',
                    data: constantData_3.SystolicBloodPressure
                },
                {
                    name: 'DiastolicBloodPressure',
                    color: 'blue',
                    data: constantData_3.DiastolicBloodPressure
                }
            ]
        }
        var configs_5 = {
            chart: {
                type: 'line',
                width: this.state.width,
                height: this.state.height
            },
            legend: {
                enabled: true,
                align: 'center',
                symbolWidth: 10,
                symbolHeight: 10,
                symbolRadius: 5,
                itemStyle:{
                    "fontSize": "0.8rem"
                }
            },
            rangeSelector : {
                  buttons: [
                  { type: 'day', count: 1, text: '1 day'},
                  { type: 'day', count: 7, text: '1w'},
                  { type: 'month', count: 1, text: '1m'},
                  { type: 'month', count: 3, text: '3m'},
                  { type: 'all', text: 'All'}
                  ],
                  selected : 5
              },
            
            title : {
                text : ''
            },
            yAxis: {
                title: {
                    text: 'mg/dl'
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
            navigator: {
                enabled: true,
            },

            series: [
                {
                    name: 'BloodSugar',
                    data: constantData_3.BloodSugar
                }
            ]
        }
        return (
                <div className="graphs_2">
                        <div style={{margin:"0 auto"}}>
                            <div className="graph_name">睡眠</div>
                            <HighchartsReact highcharts = {Highstock} constructorType = {'stockChart'} options = {configs_1}  className="graph"/>
                        </div>
                        <div style={{margin:"0 auto"}}>
                            <div className="graph_name">活動量</div>
                            
                            <HighchartsReact highcharts = {Highstock} constructorType = {'stockChart'} options = {configs_2} />
                        </div>
                        <div style={{margin:"0 auto"}}>
                            <div className="graph_name">卡路里</div>
                            <HighchartsReact highcharts = {Highstock} constructorType = {'stockChart'} options = {configs_3} />
                        </div>
                        <div style={{margin:"0 auto"}}>
                            <div className="graph_name">血壓</div>
                            <HighchartsReact highcharts = {Highstock} constructorType = {'stockChart'} options = {configs_4} />
                        </div>
                        <div style={{margin:"0 auto"}}>
                            <div className="graph_name">血糖</div>
                            <HighchartsReact highcharts = {Highstock} constructorType = {'stockChart'} options = {configs_5} />
                        </div>
                </div>
                
        )
    }
}

export default Preview_2