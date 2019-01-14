const express = require('express');
const router = express.Router();
const {Notebook} = require('../models/notebook');

const {validateId} = require('../middlewares/notebook_validation')
const {Note} = require('../models/note')

//localhost:3001/notebooks/
router.get('/',function(req,res){
    Notebook.find().then(function(notebooks){
        console.log(notebooks);
        res.send(notebooks);
    }).catch(function(err){
        res.send('no records found');
    })
})

//localhost:3001/notebooks/id
router.get('/:id',validateId,function(req,res){
    let id = req.params.id;
    Notebook.findById(id).then(function(notebook){
        res.send(notebook);
    }).catch(function(err){
        res.send(err);
    })
})

//localhost:3001/notebooks/id/notes
router.get('/:id/notes',(req,res)=>{
    let id = req.params.id;
    Note.find({notebook:id}).then(notes=>{
        res.send(notes);
    }).catch(function(err){
        res.send(err);
    })
})

//post localhost:3001/notebooks/
router.post('/',function(req,res){
    let body = req.body;
    let n = new Notebook(body);
    n.save().then(function(notebook){
        res.send(notebook);
    }).catch(function(err){
        res.send(err);
    })
})

//put localhost:3001/notebooks/id
router.put('/:id',validateId,function(req,res){
    let id = req.params.id;
    let body = req.body;
    Notebook.findByIdAndUpdate(id,{$set:body},{new:true}).then(function(notebook){
            res.send(notebook);
        }).catch(function(err){
            res.send(err);
    })
})

//delete localhost:3001/notebooks/id
router.delete('/:id',validateId,function(req,res){
    let id = req.params.id;
    Notebook.findOneAndDelete(id).then(function(notebook){
        res.send({
            notice:'Sucessfully deleted the notebook'
        })
    }).catch(function(err){
        res.send(err);
    })
})

module.exports = {
    notebooksController: router
}
