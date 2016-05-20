var mongoose     = require('mongoose');
var Schema = mongoose.Schema;

var VideoPosts = new Schema({
    Title: String,
    PubDate: Date,
    description: String,
    imageUrl: String});

module.exports = mongoose.model('VideoPosts', VideoPosts);
