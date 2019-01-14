const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notebookSchema = new Schema({
    title:{
        type:String,
        required:true,
        minlength:1  
    }
});

const Notebook = mongoose.model('Notebook',notebookSchema);

module.exports = {
    Notebook
}


