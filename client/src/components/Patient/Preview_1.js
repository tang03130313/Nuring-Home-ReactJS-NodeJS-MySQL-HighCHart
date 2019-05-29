import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { vw, vh } from 'react-native-css'
import '../../index.css';
import constantData from './History_Sleep.json';
import { patient_1 } from '../UserFunctions'

import Highcharts from 'highcharts' //npm install highcharts-more --save
import * as HighchartsMore from "highcharts/highcharts-more"
import Highstock from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official' //npm install highcharts-react-official

HighchartsMore(Highcharts)
HighchartsMore(Highstock)


class Preview_1 extends Component {
    constructor() {
        super()
        this.state = {
            StagesDeep: '',
            StagesLight: '',
            StagesRem: '',
            StagesWake: '',
            LightlyActiveMinutes: '',
            FairlyActiveMinutes: '',
            VeryActiveMinutes: '',
            CaloriesOut: '',
            width: '',
            height: ''
        }
        var NewArray = new Array();
　      NewArray = window.location.href.split('/');
        console.log(NewArray[NewArray.length-1]);
        const userid =  NewArray[NewArray.length-1];
        patient_1(userid).then(res => {
            console.log(res);
            //console.log(res[3] != undefined ? 1 : 0);
            this.setState({
                LightlyActiveMinutes: res[1] != undefined ? res[1].sum_1 : 0,
                FairlyActiveMinutes: res[1] != undefined ? res[1].sum_2 : 0,
                VeryActiveMinutes: res[1] != undefined ? res[1].sum_3 : 0,
                CaloriesOut: res[1] != undefined ? res[1].sum_4 : 0,
                StagesDeep:  res[2] != undefined ? res[2].StagesDeep : 0,
                StagesLight: res[2] != undefined ? res[2].StagesLight : 0,
                StagesRem:  res[2] != undefined ? res[2].StagesRem : 0,
                StagesWake: res[2] != undefined ? res[2].StagesWake : 0,
                width: Number(document.body.clientWidth*0.4),
                height: Number(document.body.clientWidth*0.2)
            })

            console.log(this.state.width);
        })

    }

    render () {
        var configs = {
            chart: {
                type: 'bar',
                width: this.state.width,
                height: this.state.height
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
                width: this.state.width,
                height: this.state.height
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
                <div className="graphs_1">
                        <div style={{margin:"0 auto"}}>
                            <div className="graph_name">昨日睡眠</div>
                            <HighchartsReact highcharts = {Highcharts} options={configs}/>
                        </div>
                        <div style={{margin:"0 auto"}}>
                            <div className="graph_name">昨日活動量/卡路里</div>
                            <HighchartsReact highcharts = {Highcharts} options={configs_2}/>
                        </div>
                    </div>
                
        )
    }
}

export default Preview_1