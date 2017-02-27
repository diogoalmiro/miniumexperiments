var timeUnits = require("minium/timeunits");
var Twitter = require("twitter");
var base = $(":root");
var credentials = {
  email : "bottyminium",
  user : "bottyminium",
  password : "qwertyuiop"
};
var twitter;
var running = false;
var primes = [];

function nextPrime(){
  if(!primes[0]){
    primes = [2];
    return 2;
  }
  else{
    var curr = primes[0] + 1;
    while(!isPrime(curr)){
      curr++;
    }
    primes.unshift( curr );
    return curr;
  }
}

function isPrime(n){
  for (var i = primes.length - 1; i >= 0; i--) {
    if( n % primes[i] === 0 ){
      return false;
    }
  }
  return true;
}

function getLastPrime(){
  goToProfile();
  var lastPrime;
  try{
    lastPrime = parseInt($(".tweet-text").first().text().split(" ")[1]);
    if(lastPrime == NaN){
      while(!primes[0] && primes[0] != lastPrime){
        nextPrime();
      }
    }
  }catch(e){
    return goHome();
  }
  goHome();
}

function updateStatus(status){
  goToProfile();
  $(".button-text").click();
  $("#user_description").click();
  $("#user_description").fill("status: "+status);
  $(".ProfilePage-saveButton").click();
  goHome();
}

function login(){
  twitter = new Twitter(base, credentials);
}

function start(){
  login();
  updateStatus("online");
  getLastPrime();
  running = true;
  tweetNextPrime()
}

function goToProfile(){
  base.browser().get("http://www.twitter.com/"+credentials.user);
}

function goHome(){
  base.browser().get("http://www.twitter.com/");
}

function tweetNextPrime(){
  twitter.tweet("Prime: "+nextPrime());
  var oldText = $("#tweet-box-home-timeline").text()
  while(oldText != ""){
    oldText = $("#tweet-box-home-timeline").waitTime(100, timeUnits.MILLISECONDS).text()
  }
  if(running){
    setTimeout(function() {
      tweetNextPrime();
    }, 7500);
  }else{
    updateStatus("offline");
  }
}

function stop(){
  running = false;
}
