const express = require('express');
const app = express();
const port = 3001;
const {mongoose} = require('./config/db'); 
const {usersController} = require('./app/controllers/users_controller');
const {notesController} = require('./app/controllers/notes_controller');
const {tagsController} = require('./app/controllers/tags_controller');

mongoose.set('useFindAndModify', false);
app.use(express.json());

app.get('/',function(req,res){
    res.send('welcome to home page')
});

app.use('/users',usersController);
app.use('/notes',notesController);
app.use('/tags',tagsController);



app.listen(port,function(){
    console.log('listening to port',port)
});