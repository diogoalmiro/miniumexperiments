var timeUnits = require("minium/timeunits");



browser.get("http://abra.pineman.win/");

$("#getname").fill("minium bot");
$("div:nth-child(6)").click();
$("#start-button").click();

var inp = $("#input");



var interval = setInterval(function(){
  var text = $("#status").text();
  if(text == "Go!"){
    clearInterval(interval);
    var totype = $("#text").text();
    type(totype,300);
  }
},100);

var t;
function type(str, time){
  $("#input").waitTime(time, timeUnits.MILLISECONDS).sendKeys(String.fromCharCode(str.charAt(0)));
  str = str.substring(1);
  if(str.length() > 0){
    type(str, time);
  }
}
