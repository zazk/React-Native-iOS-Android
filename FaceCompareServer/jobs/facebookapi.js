var fetch = require('node-fetch');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://chidgeychris:chidgey1176@ds059135.mongolab.com:59135/react_native_feeds';
var REQUEST_urlFB = "https://graph.facebook.com/v2.5/341888615911885/posts?fields=description%2Cpicture%2Csource%2Ctype%2Clink%2Cmessage%2Ccreated_time&access_token=1611873059075712|b4dadf1ffb088564c27b006fb5d1f98d";

var sampleArray = [];

fetch(REQUEST_urlFB)
   .then(function(res) {
     return res.json();
   }).then(function(resData) {
     for (i = 0; i <20; i++){
       sampleArray.push({
           Title: resData.data[i].message,
           postId: resData.data[i].id,
           PubDate: resData.data[i].created_time,
           Image: resData.data[i].picture,
           Link: resData.data[i].link,
           Description: resData.data[i].description
        });
     }
    console.log(sampleArray)
    //console.log(resData.data);
  });

  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', url);

      var collection = db.collection('facebookPosts');

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
