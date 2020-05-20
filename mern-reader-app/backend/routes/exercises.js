const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
    Exercise.find()
     .then(exercises => res.json(exercises))
     .catch(err => res.status(400).json("Error: " + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);//the duration is converted to a number
    const date = Date.parse(req.body.date); // the date is converted to a date datatype.

   const newExercise = new Exercise ({ //create a new exercise with the data collected
       username,
       description,
       duration,
       date 
   });
   
   newExercise.save()
    .then(() => res.json('Exercise added! '))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {  // this finds the object id created automatically with mongodb
    Exercise.findById(req.params.id) //it gets the id from the url
     .then(exercise => res.json(exercise))
     .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
     .then(() => res.json('Exercises deleted.'))
     .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date(req.body.date);

        exercise.save()
         .then(() => res.json('Exercise updated!'))
         .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
