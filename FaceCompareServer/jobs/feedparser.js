var FeedParser = require('feedparser')
  , request = require('request');
var req = request('https://foundrmag.com/feed/')
  , feedparser = new FeedParser();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://chidgeychris:chidgey1176@ds059135.mongolab.com:59135/react_native_feeds';

req.on('error', function (error) {
  console.error(error);
});
req.on('response', function (res) {
  var stream = this;

  if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

  stream.pipe(feedparser);
});


feedparser.on('error', function(error) {
  console.error(error);
});
feedparser.on('readable', function() {
  // This is where the action is!
  var sampleArray = [];
  var stream = this
    , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
    , item;

  while (item = stream.read()) {

     sampleArray.push({
         Title: item.title,
         Link: item.link,
         PubDate: item.date,
         //Image: item.image.url

      });
     console.log(sampleArray)

     MongoClient.connect(url, function (err, db) {
       if (err) {
         console.log('Unable to connect to the mongoDB server. Error:', err);
       } else {
         //HURRAY!! We are connected. :)
         console.log('Connection established to', url);

         // Get the documents collection
         var collection = db.collection('RSSBlogPosts');

         // Insert some users
         collection.insert(sampleArray, function (err, result) {
           if (err) {
             console.log(err);
           } else {
             console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
           }
           //Close connection
           db.close();
         });
       }
     });

  }
});
