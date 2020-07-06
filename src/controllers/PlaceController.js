const Place = require('../models/Place');

module.exports = {

    async index(req, res){ // Show all places registered
        const place = await Place.find();
        
        return res.json(place);
    },

    async store(req, res){ // Register a new place
        const { Name, Address, Number, Description } = req.body;
        const place = await Place.create({  Name, Address, Number, Description });
        
        return res.json({ place });
    },

    async delete(req, res){ // Delete a specific place
        
        Place.deleteOne({_id: req.params.id}, (err) => {
            // Return an error if place have not been errased
            if(err) return res.status(400).json({
                error: true,
                message: "Error: Place have not been successfull erased"
            });
    
            // Return a success msg if place have been errased
            return res.json({
                error: false,
                message: "Place erased!"
            });
        });

    },

    async deleteAll(req, res){ // Delete all registered places
        
        Place.deleteMany({ }, (err) => {
            // Return an error if table not correctly empty
            if(err) return res.status(400).json({
                error: true,
                message: "Error: Places table not correctly empty!"
            });
    
            // Return success if the table is correctly empy
            return res.json({
                error: false,
                message: "Places table correctly empty!"
            });
        });
    },

}