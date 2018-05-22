console.log('The Bot is starting!');

// imports
var Twit = require('twit');
var config = require('./config');
var fs = require('fs');

//get access tokens and keys
var T = new Twit(config)

//setting up a new user stream
var stream = T.stream('user');

//anytime someone follows me call the followed() method
// stream.on('follow',followed);

//Tweets with an image
// tweetWithAnImage();

//Stream a tweet reply for a mentioned tweet
//'tweet' - will get a new tweet which is posted by a person you follow
stream.on('tweet',tweetaReply);

function tweetaReply(eventMsg){
    //save to JSON file to analyze data
    // var json = JSON.stringify(eventMsg,null,2);
    // fs.writeFileSync("Assets/files/tweet.json",json)
    console.log('New Tweet');

    //gets the screen name if it is in reply to someone
    var inReplyTo = eventMsg.in_reply_to_screen_name;
    //get the tweet msg's text
    var tweetTextMsg = eventMsg.text;
    //who tweeted the msg
    var tweetIsBy = eventMsg.user.screen_name;

    console.log('To '+inReplyTo+' from '+tweetIsBy);

    if(inReplyTo==='buddhiadikari2'){
        var newTweet = '@'+tweetIsBy+ ' Thank you for the tweet! #TwitterBot';
        tweetWithMsg(newTweet);
    }
    

}

//followed function
function followed(eventMsg){
    var name = eventMsg.source.name;
    var screenName = eventMsg.source.screen_name;

    console.log('@'+screenName+'followed you!')
    tweetWithMsg('. @'+ screenName + ' Thank you for following, Have a great day!');
}

//call tweetIt() every 20 seconds
// tweetIt();
// setInterval(tweetIt,1000*20);

// posts a tweet with a random number
function tweetIt(){

    var r = Math.floor(Math.random()*100);
    
    var tweet = {
        status:'#TwitterBot #BotTesting This twitter bot can now post with random numbers '+r
    }

    T.post('statuses/update',tweet,tweeted);

    function tweeted(err, data, response){
        if(err){
            console.log('An error occured! BAC!');
        }else{
            console.log('Tweeted Succesfully!');
        }
    }
}

function tweetWithMsg(msg){

    var tweet = {
        status: msg
    }

    T.post('statuses/update',tweet,tweeted);

    function tweeted(err, data, response){
        if(err){
            console.log('An error occured! BAC!');
        }else{
            console.log('Tweeted Succesfully!');
        }
    }
}

function tweetWithAnImage(){
    var filename = 'Assets/imgs/someImage/output.png'
    var params = {
        encoding: 'base64'
    }

    var b64Content = fs.readFileSync(filename,params);
    T.post('media/upload',{media_data:b64Content},uploaded);

    function uploaded(err, data, response) {

        var mediaIDString = data.media_id_string;
        var tweet = {
            status:'#TwitterBot live from Nodejs posting an image using processing 3',
            media_ids:[mediaIDString]
        }

        T.post('statuses/update',tweet,tweeted);

    }

    function tweeted(err, data, response){
        if(err){
            console.log('An error occured! BAC!');
        }else{
            console.log('Tweeted Succesfully!');
        }
    }
}


// console.log('The Bot stopped succesfully!');