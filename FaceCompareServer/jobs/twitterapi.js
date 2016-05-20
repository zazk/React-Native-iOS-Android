var Twit = require('twit')

var T = new Twit({
    consumer_key:         '4aDbdYqVafpoSMNgEtp3WnmSY'
  , consumer_secret:      'WwvPk1arU0xguRuWaK73VtUQVrnwT0NLbxStTi8v26GvK7ttlt'
  , app_only_auth:        true
})

// T.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
//   console.log(data)
// })

T.get('statuses/user_timeline', {
  user_id: '1297100576',
  trim_user: true,
  count: 10
  },function(err, data, response) {
  console.log(data)
})

// T.get('statuses/oembed', {
//   id: 'sampleArray[0]',
//   maxwidth: 300,
//   },function(err, data, response) {
//   console.log(data)
// })
