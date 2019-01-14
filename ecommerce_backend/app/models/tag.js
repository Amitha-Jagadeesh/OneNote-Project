const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    name:{
        type:String,
        required:true,
        minlength:1  
    },
    note:[{
        type:Schema.Types.ObjectId,
        required:true
    }]
});

const Tag = mongoose.model('Tag',tagSchema);

module.exports = {
    Tag
}


