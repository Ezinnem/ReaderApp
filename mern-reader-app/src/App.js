import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; //react-router makes it easier to route diffreent url to diffreent components
import "bootstrap/dist/css/bootstrap.min.css"; 

import Navbar from "./components/navbar.componen";
import ExerciseList from "./components/exercises-list.componen";
import EditExercise from "./components/edit-exercises.componen"
import CreateExercise from "./components/create-exercises.componen"
import CreateUser from "./components/create-user.componen"

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path = "/" exact component={ExerciseList} />
        <Route path = "/edit/:id" exact component={EditExercise} />
        <Route path = "/create" exact component={CreateExercise} />
        <Route path = "/user" exact component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
