const express = require('express'); //Requiring the express package
const cors = require('cors');//cors is a package 

const mongoose = require('mongoose'); //Helps us to connect to the mongodb database

require('dotenv').config(); //configuration for us to hav our environment variables in the dotenv file

const app = express();
const port = process.env.PORT || 5000; //Creating the express server

app.use(cors()); // setting up the middleware
app.use(express.json());//cors allows us tho parse json

const uri = process.env.ATLAS_URI;//database uri assigned to atlas uri in the dotenv file
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }); //connecting to the database

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB databse connection established successfully");
})

//Bringin in the model files

const exercisesRouter = require('./routes/exercises'); //inistialized the files
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter); //tellin the server to use the file for specific routes
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});