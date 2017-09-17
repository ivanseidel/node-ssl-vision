const SslVision = require('./index')

async function start(){
  let client = new SslVision()

  await client.connect()

  // client.on('data', (data) => {
  //   console.log(JSON.stringify(data, null, 2))
  // })

  client.on('geometry', (data) => {
    console.log(JSON.stringify(data, null, 2))
  })

  // client.on('detection', (data) => {
  //   if (data.balls.length > 0) {
  //     let ball = data.balls[0]
  //     console.log(`x: ${ball.x.toFixed(2)}\ty:${ball.y.toFixed(2)}`)
  //   }
  // })
}

process.on('unhandledRejection', (e) => {
  console.error('Unhandled Rejection')
  console.error(e.stack)
  process.exit(1)
})

start()