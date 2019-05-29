import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import '../../index.css';
import example from '../image/image_example.jpg';
import { patient_1 } from '../UserFunctions'

import Highcharts from 'highcharts' //npm install highcharts-more --save
import * as HighchartsMore from "highcharts/highcharts-more"
import Highstock from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official' //npm install highcharts-react-official


HighchartsMore(Highcharts)
HighchartsMore(Highstock)


class Preview_5 extends Component {
    constructor() {
        super()
        this.state = {
            width: Number(document.body.clientWidth*0.4),
            height: Number(document.body.clientWidth*0.2),
            textsize: Number(document.body.clientWidth*0.001)
        }
        
    }

    render () {
        console.log(example);
        return (
                <div className="graphs_4">
                    <img src={example} />
                </div>
                
        )
    }
}

export default Preview_5