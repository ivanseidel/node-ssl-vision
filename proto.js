const path = require('path')
const protobuf = require('protocol-buffers')
const readProtoFile = require('./readProtoFile')

const file = 'proto/messages_robocup_ssl_wrapper.proto'
const absFile = path.join(__dirname, file)

// Load protobuf with the transpiled protobuf files
module.exports = protobuf(readProtoFile(absFile))