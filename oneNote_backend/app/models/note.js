const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    author:{
        type:String
    },
    tags:[{
        tag:{
            type:String
        }
    }]
    
});

const Note = mongoose.model('Note',noteSchema);

module.exports = {
    Note
}


