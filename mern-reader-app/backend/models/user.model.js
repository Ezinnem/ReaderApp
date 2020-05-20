const mongoose = require('mongoose');

const Schema = mongoose.Schema; //Mongose schema    

const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3 //validations to the username
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema); // the "User is the name will use inside the mongdb database"

module.exports = User;