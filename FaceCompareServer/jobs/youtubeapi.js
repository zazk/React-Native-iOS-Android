var fetch = require('node-fetch');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://chidgeychris:chidgey1176@ds059135.mongolab.com:59135/react_native_feeds';
var REQUEST_urlVideo = "https://www.googleapis.com/youtube/v3/activities?part=snippet%2CcontentDetails&channelId=UChpWgrkJY_i7F6wwI_TOnrg&maxResults=10&key=AIzaSyCtW5peXnM_5acTx1r9RnpwZtCgANLyPHM";

var sampleArray = [];

fetch(REQUEST_urlVideo)
   .then(function(res) {
     return res.json();
   }).then(function(data) {
     for (i = 0; i <10; i++){
       sampleArray.push({
           Title: data.items[i].snippet.title,
           videoId: data.items[i].id,
           PubDate: data.items[i].snippet.publishedAt,
           //Image: item.image.url
        });
     }
    console.log(sampleArray)
    //console.log(jsonData);
  });

  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', url);

      var collection = db.collection('videoposts');

      collection.insert(sampleArray, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
        }
        db.close();
      });
    }
  });
