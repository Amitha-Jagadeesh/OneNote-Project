const express = require('express');
const app = express();
const port = 3001;
const {mongoose} = require('./config/db'); 
const {notebooksController} = require('./app/controllers/notebooks_controller');
const {notesController} = require('./app/controllers/notes_controller');
//const {tagsController} = require('./app/controllers/tags_controller');
const {notes_tagController} = require('./app/controllers/tags_controller1')
//const {usersController} = require('./app/controllers/users_controller');

mongoose.set('useFindAndModify', false);
app.use(express.json());

app.get('/',function(req,res){
    res.send('welcome to home page')
});

app.use('/notebooks',notebooksController);
app.use('/notes',notesController);
//app.use('/tags',tagsController);
app.use('/tags',notes_tagController);


//app.use('/users',usersController);
app.listen(port,function(){
    console.log('listening to port',port)
});