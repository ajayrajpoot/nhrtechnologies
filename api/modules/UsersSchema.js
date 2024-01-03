const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    Name: String,
    Email: String,
    Password: String,
    Gender: String,
    Address: String,
    Role: String
}, { collection: 'Users' });
module.exports = mongoose.model('Users', UsersSchema) 
