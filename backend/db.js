require('dotenv').config()
const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect(process.env.DATABASE, (error) => {
        error ? console.log("Sorry boss, we can not connect with database" + error) : console.log("Yes boss, we are connected to database");
    })
}

module.exports = connectDatabase;