const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        unique: true,
        required: true,
    },
    Tel: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    Admin:{
        type: Boolean,
        required: true
    }
});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.Password, 10);
    this.Password = hash;
    next();
});

module.exports = mongoose.model('User', UserSchema);