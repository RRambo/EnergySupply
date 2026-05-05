/*
points = shape of the house [[upper left corner x, y], [up right corner], [bottom right], [bottom left]]
rotation = rotation of house
solarPosition = position of solar panel relative to house
positionPercent = position of house on the map
*/
// Aspect ratio of the background image (neighborhood)
const CONTAINER_WIDTH = 1266
const CONTAINER_HEIGHT = 976

const calculateHouseSize = (points) => {
  // Calculates the size of the house in pixels
  const xs = points.map(p => p[0])
  const ys = points.map(p => p[1])
  const minX = Math.min(...xs)
  const minY = Math.min(...ys)
  const width = Math.max(...xs) - minX
  const height = Math.max(...ys) - minY

  return { width, height }
}

export const houseShapes = {
  '1': {
    // ∨∨∨ points [UL], [UR], [BR], [BL]
    points: [[0, 0], [130, 0], [130, 110], [0, 110]],
    rotation: 2,
    solarPosition: { x: 45, y: 35 },
    positionPercent: { x: 82, y: 85 }
  },
  '3': {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [133, 0], [133, 110], [0, 110]],
    rotation: 8,
    solarPosition: { x: 45, y: 35 },
    positionPercent: { x: 69, y: 85 }
  },
  '5': {
    // ∨∨∨ points [◰], [◳], [◲], [◱]
    points: [[0, 0], [107, 0], [104, 110], [0, 110]],
    rotation: 6,
    solarPosition: { x: 33, y: 35 },
    positionPercent: { x: 56, y: 85 }
  },
  '7': {
    // ∨∨∨ points [↖], [↗], [↘], [↙]
    points: [[0, 0], [95, 0], [93, 141], [0, 140]],
    rotation: 8,
    solarPosition: { x: 25, y: 50 },
    positionPercent: { x: 46, y: 84 }
  },
  '9': {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [105, 0], [106, 88], [83, 88], [82, 121], [0, 120]],
    rotation: 8,
    solarPosition: { x: 27, y: 35 },
    positionPercent: { x: 36, y: 85 }
  },
  '11': {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [172, 0], [170, 128], [0, 127]],
    rotation: 7,
    solarPosition: { x: 70, y: 40 },
    positionPercent: { x: 19, y: 85 }
  },
  '15': {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [157, 0], [157, 125], [0, 125]],
    rotation: 7,
    solarPosition: { x: 60, y: 45 },
    positionPercent: { x: 1, y: 82 }
  },
  '20B': {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [115, 0], [115, 85], [0, 85]],
    rotation: 2,
    solarPosition: { x: 35, y: 25 },
    positionPercent: { x: 14, y: 62 }
  },
  '20A': {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [120, 0], [120, 70], [0, 70]],
    rotation: 1,
    solarPosition: { x: 38, y: 20 },
    positionPercent: { x: 14, y: 54 }
  },
  '20': {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [125, 0], [125, 130], [0, 130]],
    rotation: 2,
    solarPosition: { x: 40, y: 50 },
    positionPercent: { x: 14.5, y: 36.5 }
  },
  '18': {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [115, 0], [115, 120], [0, 120]],
    rotation: 2,
    solarPosition: { x: 40, y: 35 },
    positionPercent: { x: 16, y: 19 }
  },
  '16': {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [100, 0], [100, 100], [0, 100]],
    rotation: 2,
    solarPosition: { x: 30, y: 30 },
    positionPercent: { x: 38, y: 12 }
  },
  '14': {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [106, 0], [106, 144], [0, 144]],
    rotation: -6,
    solarPosition: { x: 30, y: 50 },
    positionPercent: { x: 54, y: 5 }
  },
  '10': {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [129, 0], [131, 125], [0, 125]],
    rotation: 2,
    solarPosition: { x: 45, y: 45 },
    positionPercent: { x: 69, y: 6 }
  },
  '8': {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [110, 0], [110, 100], [0, 100]],
    rotation: 3,
    solarPosition: { x: 35, y: 35 },
    positionPercent: { x: 78, y: 29 }
  },
  '6': {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [122, 0], [122, 90], [0, 90]],
    rotation: 4,
    solarPosition: { x: 40, y: 30 },
    positionPercent: { x: 76, y: 43 }
  },
  '4': {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [100, 0], [100, 120], [0, 120]],
    rotation: 2,
    solarPosition: { x: 30, y: 40 },
    positionPercent: { x: 75, y: 57 }
  },
  '2': {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [115, 0], [115, 125], [0, 125]],
    rotation: 3,
    solarPosition: { x: 35, y: 40 },
    positionPercent: { x: 86, y: 58 }
  },
  '17': {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [103, 0], [103, 131], [0, 131]],
    rotation: 0,
    solarPosition: { x: 30, y: 50 },
    positionPercent: { x: 46, y: 58 }
  },
  '19': {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [108, 0], [108, 155], [0, 155]],
    rotation: 2,
    solarPosition: { x: 30, y: 60 },
    positionPercent: { x: 58, y: 55 }
  },
  '21': {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [104, 0], [104, 150], [0, 150]],
    rotation: 3,
    solarPosition: { x: 35, y: 60 },
    positionPercent: { x: 59, y: 32 }
  },
  '25': {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [120, 0], [120, 120], [0, 120]],
    rotation: 4,
    solarPosition: { x: 40, y: 40 },
    positionPercent: { x: 33, y: 35 }
  },
  '27': {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [122, 0], [122, 104], [0, 104]],
    rotation: 3,
    solarPosition: { x: 40, y: 35 },
    positionPercent: { x: 32, y: 54 }
  }
}

// Adds the houseSizes in pixels to the objects in the helper list
Object.values(houseShapes).forEach(shape => {
  const box = calculateHouseSize(shape.points)
  // Used to set the viewbox of the houses
  shape.width = box.width
  shape.height = box.height

  // Calculates the size of the houses relative to the neighborhood-container
  // This is needed so that the house sizes can scale down with smaller neighborhood-containers (smaller screens)
  shape.widthPercent = box.width / CONTAINER_WIDTH * 100
  shape.heightPercent = box.height / CONTAINER_HEIGHT * 100
})