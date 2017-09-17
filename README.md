# SSL Vision NodeJS Client

[![ssl-vision Version][ssl-vision-version-image]][ssl-vision-version-link]

Read RoboCup SSL Vision from NodeJS

[ssl-vision-version-image]: https://img.shields.io/npm/v/ssl-vision.svg?style=flat&label=ssl-vision
[ssl-vision-version-link]: https://www.npmjs.com/package/ssl-vision

## Installation

```
$ npm install ssl-vision
```

## Why

This library was created for three main reasons:

1. Because it should be simple to read from SSL Vision in all languages
2. Encourage new teams to adopt new languages
3. Because we wanted to

## Usage

```javascript
const SslVision = require('ssl-vision')

async start() {
  let client = new SslVision(<Optional IP>, <Optional PORT>)
  
  await client.connect()

  // Reads all data comming from the SSL Vision parsed as JSON Objects
  client.on('data', (data) => {
    console.log(data)
    // Outputs: { detection: <DetectionData>, geometry: <GeometryData> }
  })

  // Listens only to geometry data
  client.on('geometry', (geometry) => {
    // Outputs <GeometryData>  
  })
}

start()

```

### `DetectionData` Format


```json
{
  "detection": {
    "frame_number": 377308,
    "t_capture": 13977.820277,
    "t_sent": 1505683703.172275,
    "camera_id": 1,
    "balls": [
      {
        "confidence": 0.930344820022583,
        "area": 78,
        "x": -14.979391098022461,
        "y": -12.432811737060547,
        "z": 0,
        "pixel_x": 276.5769348144531,
        "pixel_y": 225.73077392578125
      }
    ],
    "robots_yellow": [],
    "robots_blue": []
  },
  "geometry": null
}
```


### `GeometryData` Format

```json
{
  "field": {
    "field_length": 1500,
    "field_width": 1300,
    "goal_width": 100,
    "goal_depth": 40,
    "boundary_width": 3,
    "field_lines": [
      {
        "name": "TopTouchLine",
        "p1": {
          "x": -750,
          "y": 650
        },
        "p2": {
          "x": 750,
          "y": 650
        },
        "thickness": 10
      },
      "{... other field lines ...}"
    ],
    "field_arcs": [
      {
        "name": "CenterCircle",
        "center": {
          "x": 0,
          "y": 0
        },
        "radius": 150,
        "a1": 10,
        "a2": 0,
        "thickness": 10
      },
      "{... other field arcs ...}"
    ]
  },
  "calib": [
    {
      "camera_id": 0,
      "focal_length": 2.1379730701446533,
      "principal_point_x": 390,
      "principal_point_y": 290,
      "distortion": 0,
      "q0": -0.0780009999871254,
      "q1": -0.9969499707221985,
      "q2": 0.0014819999923929572,
      "q3": 0.0017130000051110983,
      "tx": -621141.125,
      "ty": -459652.8125,
      "tz": 3500,
      "derived_camera_world_tx": -542101.5625,
      "derived_camera_world_ty": 550669.6875,
      "derived_camera_world_tz": -0.6016282439231873
    },
    "{... other cameras ...}"
  ]
}
``` 

### Creator
[Ivan Seidel Gomes](https://github.com/ivanseidel)
[João Pedro Vilas Boas](https://github.com/joaopedrovbs)