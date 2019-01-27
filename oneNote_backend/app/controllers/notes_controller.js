const express = require('express');
const router = express.Router();
const {Note} = require('../models/note');
const {authenticateUser} = require('../middlewares/userAuthentication')
const {validateId} = require('../middlewares/note_validation');


router.get('/',authenticateUser,function(req,res){
    let user = req.user.username
    console.log("token",user)
    Note.find({author:user}).then(function(notes){
        console.log(notes)
        res.send(notes);
    }).catch(function(err){
        res.send(err);
    })
})

//localhost:3001/notes/id
router.get('/:id',authenticateUser,validateId,function(req,res){
    let id = req.params.id
    let user = req.user.username
    Note.findById(id,{author:user}).then(function(note){
        res.send(note);
    }).catch(function(err){
        res.send(err);
    })
})

router.post('/',authenticateUser,function(req,res){
    let user = req.user.username
    console.log("user",user)
    let body = req.body;
    let n = new Note(body);
    n.save().then(function(note){
        note.author = user
        note.save()
        console.log("note is",note)
            res.send(note);
        }).catch(function(err){
            res.send(err);   
        })    
    })

//localhost:3001/notes/id
router.put('/:id',authenticateUser,validateId,function(req,res){
    let user = req.user.username
    let id = req.params.id;
    let body = req.body;
    console.log(req.body)
    Note.findOneAndUpdate(id && {author:user},{$set:body},{new:true}).then(function(note){
        res.send(note);
    }).catch(function(err){
        res.send(err);
    })
})

//localhost:3001/notes/id
router.delete('/:id',authenticateUser,validateId,function(req,res){
    let id = req.params.id;
    let user = req.user.username
    Note.findOneAndDelete(id && {author:user}).then(function(note){
        res.send({
            notice:'note deleted successfully'
        })
    }).catch(function(err){
        res.send(err);
    })
})

module.exports = {
    notesController:router
}