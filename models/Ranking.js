const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rankingSchema = new Schema({
    rank: {
        type: Number
    },
    moviename:{
        type: String
    },
    userID:{
        type:String
    }
}, {timestamps: true})

 const Ranking = mongoose.model('Ranking', rankingSchema)
 module.exports = Ranking