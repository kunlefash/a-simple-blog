const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        require: true,
        min: 5,
        max: 20,
        unique: true
        
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 30
    },
    profilePic: {
        type: String,
        default: ""
    },
    coverPic: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []

    },
    following: {
        type: Array,
        default: []

    },
    isAdmin: {
        type: Boolean,
        default: false

    },
},
{timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);