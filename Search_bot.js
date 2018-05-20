console.log('The Bot is starting!');

// imports
var Twit = require('twit');
var config = require('./config');

//get access tokens and keys
var T = new Twit(config)

// params for the get function of Twit
var params ={
    q:'fuck',
    count:2
}

T.get('search/tweets',params,gotData);

function gotData(err,data,response) {
    var tweets = data.statuses;

    for (var i =0;i<tweets.length;i++){
        console.log(tweets[i].text+' \n');
    }
}
  
