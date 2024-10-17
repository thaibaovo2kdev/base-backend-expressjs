const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    _id: { type: String }, //GET_USER, ADMIN, SUPPORT, FINANCE, EMPLOYEE
   description: { type: String }, 
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('permission', schema);