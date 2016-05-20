var fetch = require('node-fetch');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://chidgeychris:chidgey1176@ds059135.mongolab.com:59135/react_native_feeds';
var REQUEST_urlAUDIO = 'https://api.soundcloud.com/users/103321572/tracks.json?client_id=688b01db515cd66d79a10afdb32bb33a';

var sampleArray = [];

fetch(REQUEST_urlAUDIO)
   .then(function(res) {
     return res.json();
   }).then(function(data) {
     for (i = 0; i <10; i++){
       sampleArray.push({
           Title: data[i].title,
           audioId: data[i].id,
           PubDate: data[i].last_modified,
           //Image: item.image.url,
           Link: data[i].uri,
           Duration: data[i].duration
        });
     }

    console.log(sampleArray)
    //console.log(jsonData);
  });

  // MongoClient.connect(url, function (err, db) {
  //   if (err) {
  //     console.log('Unable to connect to the mongoDB server. Error:', err);
  //   } else {
  //
  //     console.log('Connection established to', url);
  //
  //     var collection = db.collection('podcasts');
  //
  //     collection.insert(sampleArray, function (err, result) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
  //       }
  //       db.close();
  //     });
  //   }
  // });

  // <Image
  //           source={{uri: track.artwork_url}}
  //           style={styles.thumbnail}
  //           />
  //         <View style={styles.rightContainer}>
  //           <Text style={styles.trackTitle}>{track.title}</Text>
  //           <View style={styles.trackDetails}>
  //             <Text style={styles.trackArtist}>{track.last_modified}</Text>
  //             <Text style={styles.trackArtist}>{track.duration}</Text>
