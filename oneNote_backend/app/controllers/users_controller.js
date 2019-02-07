const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const {authenticateUser} = require('../middlewares/userAuthentication')

router.post('/',function(req,res){
    let body = req.body;
    let user = new User(body);
    user.save().then((function(user){
        return user.generateToken()
    })).then (function(token){
        res.json({'x-auth':token}).send()
    }).catch(function(err){
        res.send(err)
    })
})

router.post('/login',function(req,res){
    let body = req.body;
    User.findByCredentials(body.username,body.password).then((function(user){
        return user.generateToken()
    })).then (function(token){
        res.json({'x-auth':token}).send()
    }).catch(function(err){
        res.send(err)
        console.log(err)
    })
})

router.get('/profile',authenticateUser,function(req,res){
    console.log(req)
    let user = req.user
    res.send({
        username: user.username,
        message:"succeeefully verified token"
    })
})

router.get('/account',authenticateUser,function(req,res){
    let user = req.user
    res.send({
        username: user.username,        
        message:req.message //retreives undefined as req object has property called message
    })
})

router.delete('/logout',authenticateUser,function(req,res){
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

module.exports = {
    usersController:router
}

