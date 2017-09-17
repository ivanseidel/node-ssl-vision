const path = require('path')
const protobuf = require('protocol-buffers')

const LoadProtoFile = require('./LoadProtoFile')

let protoPath = path.join(__dirname, 'proto/messages_robocup_ssl_wrapper.proto')
// let proto = LoadProtoFile(protoPath)

// console.log()
// console.log()
// console.log('==================')
// console.log(proto)
// wrapper = fs.readFileSync('proto/messages_robocup_ssl_wrapper.proto')
var ssl = protobuf(LoadProtoFile(protoPath))

//   IP: 192.168.1.31
// PORT: 10002

var PORT = 10006
var HOST = '224.5.23.3'
var dgram = require('dgram')
var client = dgram.createSocket('udp4')

client.on('listening', function () {
  console.log('> listening')
})

client.on('message', function (message, remote) {   
  console.log(remote)
  console.log(ssl.SSL_WrapperPacket.decode(message))
    // console.log('A: Epic Command Received. Preparing Relay.')
    // console.log('B: From: ' + remote.address + ':' + remote.port +' - ' + message)
})

client.bind(PORT, HOST, function () {
    var address = client.address()
    console.log('UDP Client listening on ' + address.address + ":" + address.port)
    client.setBroadcast(true)
    client.setMulticastTTL(128) 
    client.addMembership(HOST)
})
