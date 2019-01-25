const express = require('express');
const router = express.Router();
const {authenticateUser} = require('../middlewares/userAuthentication')
const {validateId} = require('../middlewares/tag_validation')
const {Note} = require('../models/note')

//localhost:3001/tags/
router.get('/',authenticateUser,function(req,res){
    let user = req.user.username
    console.log(user)
    let tags = []
    Note.find({author:user}).then(function(notes){
        notes.forEach(note=>{
            note.tags.forEach(tag=>{
                console.log(tag.tag)
                tags.push(tag)                
            })
        })
        res.send(tags);
    }).catch(function(err){
        res.send('no records found');
    })
})

//localhost:3001/tags/id
router.get('/:id',authenticateUser,validateId,function(req,res){
    console.log('enetring id')
    let id = req.params.id;
    console.log(id)
    let user = req.user.username 
    console.log(user)
    Note.find({author:user}).then(function(notes){
        notes.forEach(note=>{
            note.tags.forEach(tag=>{
                if(tag.id === id) {
                    res.send(tag);
                }              
            })
        })        
    }).catch(function(err){
        res.send('no records found');
    })
})

//localhost:3001/tags/name/notes
router.get('/:name/notes',authenticateUser,(req,res)=>{
    let name = req.params.name;
    let user = req.user.username
    let notesAssosiatedwithtag = []
    Note.find({author:user}).then(notes=>{
        notes.forEach(note=>{
            note.tags.forEach(tag=>{
                if(tag.tag === name){
                    notesAssosiatedwithtag.push(note)
                }
            })
        })
        res.send(notesAssosiatedwithtag);
    }).catch(function(err){
        res.send(err);
    })
})

//delete localhost:3001/tags/name
router.delete('/logout',authenticateUser,function(req,res){
    //let user = req.user
    const {user,token} =req
    const tokenInfo = user.tokens.find(function(tokenItem){
        return tokenItem.token == token
    })
    user.tokens.id(tokenInfo._id).remove()
    user.save().then((user)=>{
        res.send({
            notice:'successfully logged out'
        })
    })
})
    
router.delete('/:name',authenticateUser,function(req,res){
    let name = req.params.name;    
    let user = req.user.username    
    Note.find({author:user}).then(function(notes){
        notes.forEach(note=>{
            console.log("note",note)
           const tagInfo =  note.tags.find(tagItem=>{ 
               console.log("tagitem",tagItem.tag)          
                return  tagItem.tag === name   
           })        
            console.log("tagInfo",tagInfo)
            if(tagInfo){
                note.tags.id(tagInfo._id).remove()
                note.save().then((note)=>{                    
                }) 
            }           
        })         
        res.send({
            notice:'Sucessfully deleted the tag',
            
        })         
            
    }).catch(function(err){
        res.send(err);
    })
})

module.exports = {
    tagsController: router
}
