const mongoose = require('mongoose')
 
const EventSchema = new mongoose.Schema({
 
    Name:{
        type:String,
        required:true,
    },
    Date:{
        type:String,
        required:true,
    },
    Time:{
        type:String,
        required:true,
    },
    Place_id:{
        type:String,
        required:true,
    },
    Capacity:{
        type:Number,
        required:true,
    }
    
   
},{timestamps: true})
 
module.exports = mongoose.model('Event', EventSchema)