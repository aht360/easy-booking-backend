const Event = require('../models/Event');
const Place = require('../models/Place');

module.exports = {

    async index(req, res){ // Show all events registered
        const event = await Event.find();
        return res.json(event);
    },

    async store(req, res){ // Register a new event
        const { Name, Date, Time, Place_id, Capacity } = req.body;

        try{
            let place = await Place.findById(Place_id);
            if(place){
                const event = await Event.create({ Name, Date, Time, Place_id, Capacity });
                console.log("Event registered!");
                return res.json({ event });
            }
        }
        catch(e){
            console.log("This place isn't in our db");
            return res.status(400).send({error: 'Place not found'});
        }
        
    },

    async delete(req, res){ // Delete a specific event
        console.log('Erasing Event with id ' + req.params.id)
        Event.deleteOne({_id: req.params.id}, (err) => {
            // Return an error if event have not been errased
            if(err) return res.status(400).json({
                error: true,
                message: "Error: Event have not been successfull erased"
            });
    
            // Return a success msg if event have been errased
            return res.json({
                error: false,
                message: "Event erased!"
            });
        });

    },

    async deleteAll(req, res){ // Delete all registered events
        console.log('Trying to delete all registered events');
        Event.deleteMany({ }, (err) => {
            // Return an error if table not correctly empty
            if(err) return res.status(400).json({
                error: true,
                message: "Error: Events table not correctly empty!"
            });
    
            // Return success if the table is correctly empy
            return res.json({
                error: false,
                message: "Events table correctly empty!"
            });
        });
    },

    async showEvent(req, res){
        const { Place_id } = req.body;

        const events = await Event.find({ Place_id });

        if(events.length === 0){
            return res.json({
                empty: true
            });
        }
        else{
            return res.json({
                empty: false
            });
        }
        

    }

}