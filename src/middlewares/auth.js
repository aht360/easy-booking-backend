const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

const User = require('../models/User');

module.exports = (req, res, next) => {

    var Header = req.headers.authorization;
    var authHeader = ''

    for (let i = 0; i < Header.length; i++) {
        if(Header[i] === ','){
            break;
        }
        else{
            authHeader = authHeader + Header[i]
        }
        
    }

    if(!authHeader){
        return res.status(401).send({ error: 'No token provided' });
    }

    const parts = authHeader.split(' ');

    if(!parts.lenght === 2){
        return res.status(401).send({ error: 'Token error' });
    }

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({ error: 'Token malformatted' });
    }

    jwt.verify(token, authConfig.secret, async (err, decoded) => {
        if(err){
            return res.status(401).send({ error: 'Token invalid' });
        }

        req.userId = decoded.id;

        return next();

    })

};