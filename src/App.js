import './App.css';
import React, { Component } from 'react';
import AverageSalaryChart from './component/averageSalaryChart';
import AverageAgeChart from './component/averageAgeChart';

import axios from 'axios';

class App extends Component {

  constructor(){
    super();

    this.state ={
        success_flag: 0,
        covidToggle: false,
        process: ""
    };
  }

  genAbsence(){
    var self = this;
    axios.post('http://127.0.0.1:8081/employee/absence/generate', {}, {
    }).then(function(response){
        console.log(response.data);

        if (response.data.success){
            self.setState({
                success_flag: 1,
                process: "generate Absence"
            });
        } else {
            self.setState({
                success_flag: 2,
                process: "generate Absence"
            });
        }
    }).catch(function(err){
        console.log(err);

        self.setState({
          success_flag: 2,
          process: "generate Absence"
        });
    });
  }

  genLeave(){
    var self = this;
    axios.post('http://127.0.0.1:8081/employee/leave/generate', {}, {
    }).then(function(response){
        console.log(response.data);

        if (response.data.success){
            self.setState({
                success_flag: 1,
                process: "generate Leave"
            });
        } else {
            self.setState({
                success_flag: 2,
                process: "generate Leave"
            });
        }
    }).catch(function(err){
        console.log(err);

        self.setState({
          success_flag: 2,
          process: "generate Leave"
        });
    });
  }

  genNewSalary(){
    var self = this;

    axios.post('http://127.0.0.1:8081/employee/salary/generate', {covidToggle: this.state.covidToggle}, {
    }).then(function(response){
        console.log(response.data);

        if (response.data.success){
            self.setState({
                success_flag: 1,
                process: "generate New Salary"
            });
        } else {
            self.setState({
                success_flag: 2,
                process: "generate New Salary"
            });
        }
    }).catch(function(err){
        console.log(err);

        self.setState({
          success_flag: 2,
          process: "generate New Salary"
        });
    });
  }

  setCovidToggle(event){
    let self = this
    if(event.target.value === 'ON'){
      self.setState({
        covidToggle: true
      })
    }else{
      self.setState({
        covidToggle: false
      })
    }
  }

  render() {
    var success_flag
    if (this.state.success_flag === 1){
        success_flag = 
         <div class="alert alert-success" role="alert">
             <strong>Your Request to {this.state.process} already in queue! </strong>
             <span>Please wait until the proccess finished.</span>
         </div>
    } else if (this.state.success_flag === 2) {
        success_flag = 
            <div class="alert alert-danger" role="alert">
              <strong>OOPS! </strong>
              <span>something went wrong in {this.state.process} process.</span>
            </div>
    }

    return (
      <div className="App">
        <header><h1>WELCOME</h1></header>
        {success_flag}
        <div class="row chart-row">
            <div class="col-6">
              <AverageSalaryChart/>
            </div>
            <div class="col-6">
              <AverageAgeChart/>
            </div>
        </div>
        <div class="row">
          <div class="col-12">
            <span>COVID TOGGLE</span>
            <div onChange={event => this.setCovidToggle(event)}>
              <input class="radio" type="radio" value="ON" name="covidToggle"/> On
              <input class="radio" type="radio" value="OFF" name="covidToggle" defaultChecked/> Off
            </div>
          </div>
          <div class="col-12">
            <button class="btn btn-primary" onClick={() => this.genAbsence()}>Generate Absence</button>
            <button class="btn btn-primary" onClick={() => this.genLeave()}>Generate Leave</button>
            <button class="btn btn-primary" onClick={() => this.genNewSalary()}>Generate New Salary</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;