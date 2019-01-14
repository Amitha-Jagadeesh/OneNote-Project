const express = require('express');
const router = express.Router();

const {Note} = require('../models/note');
const {validateId} = require('../middlewares/note_validation');
const {Tag} = require('../models/tag')

//localhost:3001/notes/
router.get('/',function(req,res){
    Note.find().then(function(notes){
        res.send(notes);
    }).catch(function(err){
        res.send(err);
    })
})

//localhost:3001/notes/id
router.get('/:id',validateId,function(req,res){
    let id = req.params.id;
    Note.findById(id).then(function(note){
        res.send(note);
    }).catch(function(err){
        res.send(err);
    })
})

//localhost:3001/notes/
router.post('/',function(req,res){
    let body = req.body;
    let n = new Note(body);
    n.save().then(function(note){
        res.send(note);
    }).catch(function(err){
        res.send(err);
    })
})

//localhost:3000/notes/id
router.put('/:id',validateId,function(req,res){
    let id = req.params.id;
    let body = req.body;
    Note.findByIdAndUpdate(id,{$set:body},{new:true}).then(function(note){
        res.send(note);
    }).catch(function(err){
        res.send(err);
    })
})

//localhost:3000/notes/id
router.delete('/:id',validateId,function(req,res){
    let id = req.params.id;
    Note.findByIdAndDelete(id).then(function(note){
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