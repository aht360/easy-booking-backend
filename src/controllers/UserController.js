const User = require('../models/User');

const authMiddleware = require('../middlewares/auth');

module.exports = {
    
    async getId(req, res){
        res.send({ 
            ok: true, 
            user_id: req.userId
        });

    },

    async getUser(req, res){
        
        const { _id } = req.body;

        const user = await User.findOne({ _id })

        if(!user){
            return res.status(400).send({error: 'Não achei usuário com esse ID'});
        }
        else{
            return res.json({
                user
            });
        }


    }

}