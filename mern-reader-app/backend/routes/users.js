const router = require('express').Router(); //Required the express router bcs this is a router
let User = require('../models/user.model'); // we require the model

//creatin the first route
router.route('/').get((req, res) => {
    User.find()//THE MONGOOSE MTHD THAT GETS THE LISTS OF THE USERS FROM THE DATABASE. it returns a promisenin users in json format
     .then(users => res.json(users))
     .catch(err => res.status(400).json('Error: ' + err));
});


// this router handle the Post request to add a user
router.route('/add').post((req, res) => {
    const username = req.body.username; //the req,body.username from the form is assigned to the variable username.

    const newUser = new User({username}); //created a new instance of the  User using the newUser

    newUser.save() //the newuser is saved to the database using the .save method
    .then(() => res.json('User added! '))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;