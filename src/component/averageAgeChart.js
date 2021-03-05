import React, { Component } from 'react';
import axios from 'axios';

import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class AverageAgeChart extends Component {

    constructor(){
        super();
    
        this.state ={
            success_flag: 0,
            chartData: []
        };
    }

    getAverageAgeData(){
        var self = this;
        axios.get('http://127.0.0.1:8081/employee/average_age_by_title', {
        }).then(function(response){
            console.log(response.data);

            if (response.data.success){
                self.setState({
                    success_flag: 1,
                    chartData: response.data.message
                });
            } else {
                self.setState({
                    success_flag: 2
                });
            }
        }).catch(function(err){
            console.log(err);

            self.setState({
                success_flag: 2
            });
        });
    }

    componentDidMount() {
        this.getAverageAgeData()
    }

    render(){
        const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", //"light1", "dark1", "dark2"
			title:{
				text: "Average Age Group By Title"
			},
			axisY: {
				includeZero: true,
                title: "Average Age"
			},
            axisX:{
                title: "Job Title"
            },
			data: [{
				type: "bar", //change type to bar, line, area, pie, etc
				//indexLabel: "{y}", //Shows y value on all Data Points
				indexLabelFontColor: "#5A5757",
				indexLabelPlacement: "outside",
				dataPoints: this.state.chartData
			}]
		}
		
        var success_flag
        if (this.state.success_flag === 2) {
            success_flag = 
                <div class="alert alert-danger" role="alert">
                    <strong>OOPS! </strong>
                    <span>Failed to fetch data.</span>
                </div>
        }

		return (
		<div>
            {success_flag}
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
		</div>
		);
    }
}

export default AverageAgeChart;