console.log('The Bot is starting!');

// imports
var Twit = require('twit');
var config = require('./config');

//get access tokens and keys
var T = new Twit(config)

var tweet = {
    status:'#TwitterBot This twitter bot can now post'
}

T.post('statuses/update',tweet,tweeted);

function tweeted(err, data, response){
    if(err){
        console.log('An error occured! BAC!');
    }else{
        console.log('Tweeted Succesfully!');
    }
}