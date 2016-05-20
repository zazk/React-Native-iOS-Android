var express    = require('express');
var app        = express();
var mongoose   = require('mongoose');
var mongodbUri = 'mongodb://chidgeychris:chidgey1176@ds059145.mlab.com:59145/face_compare_demo';
mongoose.connect(mongodbUri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 3000;        // set our port

var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

/// routes to categories
var Categories = require('./models/categories');

// router.post('/cats', function(req, res) {
//
//   var cats = new BlogPosts();
//     posts.Title = req.body.Title;
//     posts.save(function(err) {
//       if (err)
//         res.send(err);
//
//       res.json({ message: 'Post created!' });
//     });
// });

router.get('/cats', function (req, res) {
  Categories.find(function (err, cats) {
    if (err) res.send(err);
      res.json(cats);
    });
});

//routes to /videos
// var VideoPosts = require('./models/videoPosts');
//
// router.post('/videos', function(req, res) {
//
//   var videos = new VideoPosts();
//     videos.Title = req.body.Title;
//     videos.PubDate = req.body.publishedAt;
//     videos.description = req.body.description;
//
//     videos.save(function(err) {
//       if (err)
//         res.send(err);
//
//       res.json({ message: 'Video created!' });
//     });
// });
//
// router.get('/videos', function (req, res) {
//   VideoPosts.find(function (err, videos) {
//     if (err) res.send(err);
//     res.json(videos);
//   });
// });


// =============================================================================
app.use(router);
app.listen(port);
console.log('Magic happens on port ' + port);
