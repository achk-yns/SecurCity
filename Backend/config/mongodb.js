const mongoose = require("mongoose");
require('dotenv').config();

const db = process.env.URI;

async function connectDB() {
    try {
        console.log(db);
        await mongoose.connect(db, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
    
        });

        console.log("MongoDB is connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;