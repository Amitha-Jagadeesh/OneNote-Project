const express = require('express');
const router = express.Router();
const {Tag} = require('../models/tag');

const {validateId} = require('../middlewares/notebook_validation')
const {Note} = require('../models/note')

//localhost:3001/tags/
router.get('/',function(req,res){
    console.log('enetring ')
    Tag.find().then(function(tags){
        console.log(tags);
        res.send(tags);
    }).catch(function(err){
        res.send('no records found');
    })
})

//localhost:3001/tags/id
router.get('/:id',validateId,function(req,res){
    console.log('enetring id')
    let id = req.params.id;
    Tag.findById(id).then(function(tag){
        res.send(tag);
    }).catch(function(err){
        res.send(err);
    })
})

//localhost:3001/tags/id/notes
router.get('/:name/notes',(req,res)=>{
    let name = req.params.name;
    console.log(name)
    Note.find({tag:name}).then(notes=>{
        res.send(notes);
    }).catch(function(err){
        res.send(err);
    })
})

//post localhost:3001/tags/
router.post('/',function(req,res){
    let body = req.body;
    let t = new Tag(body);
    t.save().then(function(tag){
        res.send(tag);
    }).catch(function(err){
        res.send(err);
    })
})

//put localhost:3001/tags/id
router.put('/:id',validateId,function(req,res){
    let id = req.params.id;
    let body = req.body;
    Tag.findByIdAndUpdate(id,{$set:body},{new:true}).then(function(tag){
            res.send(tag);
        }).catch(function(err){
            res.send(err);
    })
})

//delete localhost:3001/tags/id
router.delete('/:id',validateId,function(req,res){
    let id = req.params.id;
    Tag.findOneAndDelete(id).then(function(tag){
        res.send({
            notice:'Sucessfully deleted the tag'
        })
    }).catch(function(err){
        res.send(err);
    })
})

module.exports = {
    tagsController: router
}
