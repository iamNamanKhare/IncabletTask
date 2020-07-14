const express = require('express')
const path = require('path')
const app = express()
const profileRoute = require('./routes/api/profile-route')
const defaultAPIRoute = require('./routes/api/default-route')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 4000
require('dotenv').config()

mongoose.connect(process.env.dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to Database")
})

app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use('/profile', profileRoute)

app.use('/default', defaultAPIRoute)

app.use('/', express.static(path.join(__dirname, 'Public')))

app.listen(PORT, () => {
    console.log(`Server running at : http://localhost:${PORT}`);
})