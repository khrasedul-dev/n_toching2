const mongoose = require('mongoose')

const newSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    name: {
        type: String
    },
    input_name: {
        type: String
    },
    email: {
        type: String
    },
    wallet: {
        type: String
    },
    BNB:{
        type: String
    }
},{versionKey: false})

module.exports = mongoose.model('user',newSchema)