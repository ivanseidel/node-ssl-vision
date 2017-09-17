const dgram = require('dgram')
const EventEmitter = require('events')

const proto = require('./proto')

module.exports = class SSLClient extends EventEmitter {

  constructor(HOST, PORT) {
    super()

    this.HOST = HOST || '224.5.23.3'
    this.PORT = PORT || 10002
    this.client = null

    // Public state variables
    this.data = null

    // Construct parser
    this.proto = proto
  }

  connect () {
    return new Promise((resolve, reject) => {
      if (this.client) {
        throw new Error('Client is already open. Close the connection first')
      }

      // Create Client
      this.client = dgram.createSocket('udp4')

      // Bind message
      this._bind()

      // Wait to bind
      this.client.bind(this.PORT, this.HOST, () => {
        // Initialize connection
        this._init()

        // Resolve
        resolve()
      })
    })
  }

  _init() {
    var address = this.client.address()
    this.client.setBroadcast(true)
    this.client.setMulticastTTL(128) 
    this.client.addMembership(this.HOST)
  }

  _bind() {
    this.client.on('message', this._message.bind(this))
  }

  _message(data, remote) {
    try {
      this.data = proto.SSL_WrapperPacket.decode(data)

      // Skip if frame is null
      if (!this.data)
        return

      // Emit data
      this.emit('data', this.data)

      // Emit detection only if set
      if (this.data.detection)
        this.emit('detection', this.data.detection)

      // Emit geometry only if set
      if (this.data.geometry)
        this.emit('geometry', this.data.geometry)
    } catch (e) {
      this.emit('error', e)
    }
  }
}
