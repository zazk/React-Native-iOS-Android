var mongoose     = require('mongoose');
var Schema = mongoose.Schema;

var RSSBlogPosts = new Schema({
    Title: String,
    Link: String,
    PubDate: Date},{
    collection: 'RSSBlogPosts'});

module.exports = mongoose.model('BlogPosts', RSSBlogPosts);
