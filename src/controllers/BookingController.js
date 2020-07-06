const User = require('../models/User');
const Event = require('../models/Event');
const Booking = require('../models/Booking');

module.exports = {

    async index(req, res){ // Show all bookings
        const booking = await Booking.find();
        console.log('Listing all bookings...');
        return res.json(booking);
    },

    async store(req, res){ // Make a booking
        const { User_id, Event_id } = req.body;
        
        try{
            let user = await User.findById(User_id);
            let event = await Event.findById(Event_id);

            if(user && event){ // Make booking

                let booking = await Booking.findOne({ User_id, Event_id });
                if(!booking){
                    const booking = await Booking.create({ User_id, Event_id });
                    console.log("Booking done!");
                    return res.json({ 
                        booking,
                        error: false
                    });
                }
                else{
                    console.log("Booking error. You already make this booking! Change account!");
                    return res.json({
                        error: true
                    });
                }

                
            }

        }
        catch(e){
            console.log("Booking error. User or Event not found.");
            return res.status(400).send({error: 'Booking error. User or Event not found.'});
        }

    },

    async delete(req, res){ // Delete a booking
        Booking.deleteOne({_id: req.params.id}, (err) => {
            // Return an error if booking have not been errased
            if(err) return res.status(400).json({
                error: true,
                message: "Error: Booking have not been successfull erased"
            });
    
            // Return a success msg if booking have been errased
            return res.json({
                error: false,
                message: "Booking erased!"
            });
        });

    },

    async getQuantity(req, res){ // Given an Event_id return qty of subscribers
        const { Event_id } = req.body;
        console.log('Looking for quantity of event ' + Event_id);
        try{
            const bookings = await Booking.find({ Event_id });
            
            return res.json({ qty: bookings.length });
        }
        catch(e){
            return res.json({ qty: '0' });
        }



    },

    async deleteAll(req, res){ // Delete all registered events
        Booking.deleteMany({ }, (err) => {
            // Return an error if table not correctly empty
            if(err) return res.status(400).json({
                error: true,
                message: "Error: Booking table not correctly empty!"
            });
    
            // Return success if the table is correctly empy
            return res.json({
                error: false,
                message: "Booking table correctly empty!"
            });
        });
    },

}
