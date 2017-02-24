var Twitter = require("twitter");
var base = $(":root");
var credentials = {
  email : "bottyminium",
  user : "bottyminium",
  password : "__PASS_HERE__"
};

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

// get last prime written;
base.browser().get("http://www.twitter.com/"+credentials.user);
var lastPrime;
try{
  lastPrime = parseInt($(".tweet-text").first().text().split(" ")[1]);
}catch(e){
  lastPrime = 0;
}
while(primes[0] != lastPrime){
  nextPrime();
}

var twitter = new Twitter(base, credentials);

setInterval(function(){
  twitter.tweet("Prime: "+nextPrime());
},12000)
