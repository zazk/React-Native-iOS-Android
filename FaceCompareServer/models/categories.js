var mongoose     = require('mongoose');
var Schema = mongoose.Schema;

var Categories = new Schema({
    name: String,
    imageFemale: String,
    imageMale: String,
    type: String,
    readyNew: Boolean},{
    collection: 'Categories'});

module.exports = mongoose.model('Categories', Categories);
