import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export class CreateExercise extends Component {
    constructor(props) {
        super(props);

        //we use the bind method to make sure the .this is bound to the right component
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

//we set the initial stae of the react conponent by assigning it to the this.state and then we create the properties that will correspond to the mongdb properties.
//State is hoe variables are creacted in react
        this.state = {
            username: "",
            description: "",
            duration: 0,
            date: new Date(),
            users: [] //this is put in here bcs there is going to be a dropdown menu where u can select all the users
        }

    }
//componentdismount is a react lifecycle mthd
    componentDidMount() {
        axios.get('http://localhost:5000/users/')
         .then (response => {
             if(response.data.length >0){
                this.setState({
                    users: response.data.map(user => user.username),             //map mthod brings out all the users in the database. and we choose only the username
                    username: response.data[0].username
                })
             }
         })
        
    }

    //then add a method that handles the properites

    //when someone enters a username, it will call the function amd set it equall to the value the user entered
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }
    onChangeDate(date) {
        this.setState({
            date: date
        })
    }
   onSubmit(e) {
       e.preventDefault();

       const exercise ={
           username: this.state.username,
           description: this.state.description,
           duration: this.state.duration,
           date: this.state.date
       }

       console.log(exercise);
       axios.post('http://localhost:5000/exercises/add', exercise)
       .then(res => console.log(res.data));

       window.location = "/"
   }
    
    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                         required 
                         className="form-control"
                         value={this.state.username}
                         onChange={this.onChangeUsername}>
                             {
                                 this.state.users.map(function(user) {
                                     return <option 
                                      key={user}
                                      value={user}>{user}
                                      </option>;
                                 })
                             }
                         </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input
                          type="text"
                          className="form-control"
                          value={this.state.description}
                          onChange={this.onChangeDescription} />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input
                          type="text"
                          className="form-control"
                          value={this.state.duration}
                          onChange={this.onChangeDuration} />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                        <DatePicker 
                         selected={this.state.date}
                         onChange={ this.onChangeDate} />
                    </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateExercise