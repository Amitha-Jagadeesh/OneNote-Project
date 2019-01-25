const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true, 
        trim:true
    },    
    password:{
        type:String,
        minlength:5,
        maxlength:128,
        required:true,
        trim:true
    },
    tokens:[{
        token:{
            type:String
        }
    }]
})

//to define our own methods
userSchema.methods.generateToken = function(){
    let user = this;
    let tokenData = {
        userId:this._id        
    }    
    let jwtToken = jwt.sign(tokenData,'supersecret')
    user.tokens.push({token:jwtToken});

    return user.save().then(function(user){
        console.log(jwtToken);
        return jwtToken;
    })
}

userSchema.pre('save',function(next){
    let user = this;
    if(user.isNew){
        bcryptjs.genSalt(10).then(function(salt){
            bcryptjs.hash(user.password,salt).then(function(encrypted){
                user.password = encrypted
                next()
            })
            }).catch(function(err){
                console.log(err);
        })
    }else{
        next()
    }
})

//findone is static method because we are calling on model
userSchema.statics.findByCredentials = function(user_name,password){
    let User = this; 
    return User.findOne({username:user_name}).then(function(user){
        if(!user){
            return Promise.reject('Invalid username/password ')
        }
        console.log(user);
        return bcryptjs.compare(password,user.password).then(function(result){
            console.log(bcryptjs.compare(password,user.password))
            console.log(result);
            if(result){
                console.log(result);
                return Promise.resolve(user)
            }else{
                console.log('enetring else part')
                return Promise.reject('Invalid username/password ')
            }
        })
        
        
    })
}

userSchema.statics.findByToken = function(token){
    let User = this;
    let tokenData;

    try{
        tokenData = jwt.verify(token,'supersecret')  
    }catch(err){ 
        return Promise.reject(err.message)
    }

    return User.findOne({
        '_id':tokenData.userId,
        'tokens.token' : token
    })
}

const User = mongoose.model('User',userSchema)

module.exports = {
    User
}