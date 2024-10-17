const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: { type: String },
    token: { type: String }, 
    time_expired: { type: Date,}, 
    created_date: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('forgot_password', schema);