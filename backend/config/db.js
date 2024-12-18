const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        mongoose.connect('mongodb+srv://srkr335:Sreejithkr12345@cluster1.ovbjg.mongodb.net/?', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);  
    }
};

module.exports = connectDB;
