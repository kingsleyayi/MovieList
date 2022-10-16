const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if(err){
            res.json({
                error: err
            })
        }

        let user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass
        })
        user.save()
        .then(response => {
            res.json({
                message: 'User added Successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occured'
            })
        })
    })

}

const login = async (req, res, next) => {
    var username = req.body.username
    var password = req.body.password
    
    User.findOne({$or: [{email:username},{phone:username}]})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({name: user.name}, 'secretValue', {expiresIn: '30s'})
                    let refreshtoken = jwt.sign({name: user.name}, 'refreshsecretValue', {expiresIn: '48h'})
                    res.json({
                        message: 'Login Successful',
                        token,
                        refreshtoken
                    })
                }else{
                    res.json({
                        message:"incorrect password"
                    })  
                }
            })
        }else{
            res.json({
                message:"no user found"
            })
        }
    })
}

const getusers = (req,res,next) => {
    User.find()
    .then((response) => {
        res.json({
            response
        })
    }).catch(error=> {
        res.json({
            message: 'An error Occured'
        })
    })

}

module.exports ={
    register,login,getusers
}