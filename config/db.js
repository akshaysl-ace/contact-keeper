const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log("connected to db");
    } catch (err) {
        console.log("error from db.js", err);
        process.exit(1);
    }
}

module.exports = connectDB;