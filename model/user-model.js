const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    img: String,
    date: String,
    status: String
})

const UserModel = mongoose.model('Users', UserSchema)

module.exports = UserModel