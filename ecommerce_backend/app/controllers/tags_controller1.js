const express = require('express')
const router = express.Router()
const {Note} = require('../models/note')

router.get('/:name',function(req,res){
    console.log('enetring')
    let tag_name = req.params.name 
    console.log(tag_name)   
    Note.find({tag:tag_name}).then(notes=>{
    if(notes){
        res.send(notes)
    }else{
        res.send({
            notice:"No notes found with given tag name"
        })
    }
    }).catch(err=>{
        res.send(err)
    })
})

module.exports ={
    notes_tagController:router
}