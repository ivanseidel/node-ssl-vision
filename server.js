var news = [
   "Borussia Dortmund wins German championship",
   "Tornado warning for the Bay Area",
   "More rain for the weekend",
   "Android tablets take over the world",
   "iPad2 sold out",
   "Nation's rappers down to last two samples"
];

var dgram = require('dgram'); 
var server = dgram.createSocket("udp4"); 
server.bind(function () {
  server.setBroadcast(true)
  server.setMulticastTTL(128);
  server.addMembership('192.168.1.37');   
  
  setInterval(broadcastNew, 3000);
})


function broadcastNew() {
    var message = new Buffer(news[Math.floor(Math.random()*news.length)]);
    server.send(message, 0, message.length, 10006, "192.168.1.37");
    console.log("Sent " + message + " to the wire...");
    //server.close();
}