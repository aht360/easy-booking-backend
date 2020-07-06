const mongoose = require('mongoose')
 
const PlaceSchema = new mongoose.Schema({
 
    Name:{
        type:String,
        required:true,
    },
    Address:{
        type:String,
        required:true,
    },
    Number:{
        type: Number,
        required: true
    },
    Description:{
        type: String,
        required: true
    }
   
},{timestamps: true})
 
module.exports = mongoose.model('Place', PlaceSchema)