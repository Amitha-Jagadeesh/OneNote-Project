const express = require('express');
const router = express.Router();
const {Note} = require('../models/note');
const {authenticateUser} = require('../middlewares/userAuthentication')
const {validateId} = require('../middlewares/note_validation');

//localhost:3001/notes/
router.get('/',authenticateUser,function(req,res){
    let userId = req.user._id
    console.log("userId",req.user._id)    
    Note.find({user:userId}).then(function(notes){
        console.log(notes)
        res.send(notes);
    }).catch(function(err){
        res.send(err);
    })
})

//localhost:3001/notes/id
router.get('/:id',authenticateUser,validateId,function(req,res){
    let id = req.params.id
    let userId = req.user._id
    console.log((userId))
    Note.findOne({_id:id,user:userId}).then(function(note){
        console.log(note)
        res.send(note);
    }).catch(function(err){
        res.send(err);
    })
})

//localhost:3001/notes/
router.post('/',authenticateUser,function(req,res){
    let userId = req.user._id
    console.log("user",userId)
    let body = req.body;
    let n = new Note(body);
    n.save().then(function(note){
        note.user = userId
        note.save()
        console.log("note is",note)
            res.send(note);
        }).catch(function(err){
            res.send(err);   
        })    
    })

//localhost:3001/notes/id
router.put('/:id',authenticateUser,validateId,function(req,res){
    let userId = req.user._id
    let id = req.params.id;
    let body = req.body;
    console.log(req.body)
    Note.findOneAndUpdate({_id:id,user:userId},{$set:body},{new:true}).then(function(note){
        res.send(note);
    }).catch(function(err){
        res.send(err);
    })
})

//localhost:3001/notes/id
router.delete('/:id',authenticateUser,validateId,function(req,res){
    let id = req.params.id;
    let userId = req.user._id
    Note.findOneAndDelete({_id:id,user:userId}).then(function(note){
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
