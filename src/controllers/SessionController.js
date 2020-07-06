const User = require('../models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');


function generateToken(params = {}){
    return jwt.sign( params, authConfig.secret, {
        expiresIn: 86400,
    })
}

module.exports = {

    async index(req, res){ // Show all users
        const user = await User.find();
        return res.json(user);
    },

    async store(req, res){ // SignUp a new user
        const { Name, Email, Tel, Password, Admin } = req.body;
        
        let user = await User.findOne({ Email });
        
        if(!user){
            
            user = await User.create({ Name, Email, Tel, Password, Admin });
            
            return res.json({
                user,
                token: generateToken({ id: user.id })
            });
        }
        else{
            
            return res.status(400).send({error: 'This email is already in use'});
        }

    },

    async delete(req, res){ //Delete a specific user

        User.deleteOne({_id: req.params.id}, (err) => {
            
            if(err) return res.status(400).json({
                error: true,
                message: "Error: User not errased successful!"
            });
    
            return res.json({
                error: false,
                message: "User successful erased!"
            });
        });

    },

    async deleteAll(req, res){ // Delete all users
        User.deleteMany({ }, (err) => {
            
            if(err) return res.status(400).json({
                error: true,
                message: "Error: Users not correctly clean!"
            });
    
            return res.json({
                error: false,
                message: "Users clean!"
            });
        });
    },

    async authenticate(req, res){ // LogIn a user
        const { Email, Password } = req.body;

        const user = await User.findOne({ Email }).select('+Password');

        if(!user){
            
            return res.status(400).send({error: 'User not found'});
        }

        if(!await bcrypt.compare(Password, user.Password)){
            
            return res.status(400).send({ error: 'Invalid password' });
        }
        else{
            

            res.send({
                user,
                token: generateToken({ id: user.id })
            });

        }

    },

}