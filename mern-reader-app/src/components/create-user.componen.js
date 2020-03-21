import React, { Component } from 'react';
import axios from 'axios';

export class CreateUser extends Component {
    constructor(props) {
        super(props);

        //we use the bind method to make sure the .this is bound to the right component
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

//we set the initial stae of the react conponent by assigning it to the this.state and then we create the properties that will correspond to the mongdb properties.
//State is hoe variables are creacted in react
        this.state = {
            username: "",
   };
}
   onChangeUsername(e) {
    this.setState({
        username: e.target.value
    })
}

onSubmit(e) {
    e.preventDefault();

    const user ={
        username: this.state.username
    }

    console.log(user);

    //To send the user to the backend
    axios.post('http://localhost:5000/users/add', user)
     .then(res => console.log(res.data));

    //after the suer has been registered we set the form back to blank
  this.setState({
      username: ''
  })
}

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                          required
                          className="form-control"
                          value={this.state.username}
                          onChange={this.onChangeUsername} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateUser;