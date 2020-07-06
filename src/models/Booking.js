const mongoose = require('mongoose')
 
const BookingSchema = new mongoose.Schema({
 
    User_id:{
        type:String,
        required:true,
    },
    Event_id:{
        type:String,
        required:true,
    }
    
   
},{timestamps: true})
 
module.exports = mongoose.model('Booking', BookingSchema)