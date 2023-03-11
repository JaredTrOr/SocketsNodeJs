const mongoose = require('mongoose');

const UserModel = mongoose.Schema({ 
    name: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    foto: {
        type: String,
        require: false
    },
    type:{
        type: String,
        default: 'user'
    },
    status: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('User', UserModel);