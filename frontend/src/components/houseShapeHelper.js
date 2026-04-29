/*
points = shape of the house [[upper left corner x, y], [up right corner], [bottom right], [bottom left]]
rotation = rotation of house
solarPosition = position of solar panel relative to house
positionPercent = position of house on the map
*/

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
  "1": {
    // ∨∨∨ points [UL], [UR], [BR], [BL]
    points: [[0, 0], [80, 0], [80, 80], [0, 80]],
    rotation: 2,
    solarPosition: { x: 30, y: 30 },
    positionPercent: { x: 82, y: 85 }
  },
  "3": {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [93, 0], [93, 70], [0, 70]],
    rotation: 6,
    solarPosition: { x: 35, y: 30 },
    positionPercent: { x: 67, y: 85 }
  },
  "5": {
    // ∨∨∨ points [◰], [◳], [◲], [◱]
    points: [[0, 0], [77, 0], [74, 80], [0, 80]],
    rotation: 6,
    solarPosition: { x: 28, y: 30 },
    positionPercent: { x: 55, y: 85 }
  },
  "7": {
    // ∨∨∨ points [↖], [↗], [↘], [↙]
    points: [[0, 0], [65, 0], [63, 81], [0, 80]],
    rotation: 6,
    solarPosition: { x: 23, y: 35 },
    positionPercent: { x: 45, y: 84 }
  },
  "9": {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [75, 0], [76, 68], [63, 68], [62, 91], [0, 90]],
    rotation: 3,
    solarPosition: { x: 27, y: 35 },
    positionPercent: { x: 34, y: 83 }
  },
  "11": {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [112, 0], [110, 78], [0, 77]],
    rotation: 7,
    solarPosition: { x: 45, y: 30 },
    positionPercent: { x: 18, y: 85 }
  },
  "15": {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [87, 0], [87, 75], [0, 75]],
    rotation: 7,
    solarPosition: { x: 30, y: 30 },
    positionPercent: { x: 1, y: 82 }
  },
  "20B": {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [75, 0], [75, 55], [0, 55]],
    rotation: 2,
    solarPosition: { x: 25, y: 18 },
    positionPercent: { x: 13.5, y: 62 }
  },
  "20A": {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [60, 0], [60, 40], [0, 40]],
    rotation: 1,
    solarPosition: { x: 20, y: 10 },
    positionPercent: { x: 14, y: 54 }
  },
  "20": {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [75, 0], [75, 80], [0, 80]],
    rotation: 2,
    solarPosition: { x: 25, y: 30 },
    positionPercent: { x: 14.5, y: 36.5 }
  },
  "18": {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [65, 0], [65, 90], [0, 90]],
    rotation: 2,
    solarPosition: { x: 25, y: 35 },
    positionPercent: { x: 16, y: 19 }
  },
  "16": {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [60, 0], [60, 60], [0, 60]],
    rotation: 3,
    solarPosition: { x: 20, y: 18 },
    positionPercent: { x: 38, y: 12 }
  },
  "14": {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [66, 0], [66, 84], [0, 84]],
    rotation: -6,
    solarPosition: { x: 20, y: 30 },
    positionPercent: { x: 54, y: 5 }
  },
  "10": {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [79, 0], [81, 75], [0, 75]],
    rotation: 2,
    solarPosition: { x: 30, y: 25 },
    positionPercent: { x: 69, y: 6 }
  },
  "8": {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [70, 0], [70, 60], [0, 60]],
    rotation: 3,
    solarPosition: { x: 25, y: 20 },
    positionPercent: { x: 77, y: 29 }
  },
  "6": {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [62, 0], [62, 60], [0, 60]],
    rotation: 4,
    solarPosition: { x: 20, y: 20 },
    positionPercent: { x: 76, y: 43 }
  },
  "4": {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [60, 0], [60, 75], [0, 75]],
    rotation: 2,
    solarPosition: { x: 20, y: 25 },
    positionPercent: { x: 75, y: 57 }
  },
  "2": {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [65, 0], [65, 75], [0, 75]],
    rotation: 3,
    solarPosition: { x: 22, y: 25 },
    positionPercent: { x: 86, y: 58 }
  },
  "17": {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [63, 0], [63, 81], [0, 81]],
    rotation: 0,
    solarPosition: { x: 20, y: 30 },
    positionPercent: { x: 46, y: 58 }
  },
  "19": {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [68, 0], [68, 95], [0, 95]],
    rotation: 2,
    solarPosition: { x: 25, y: 40 },
    positionPercent: { x: 58, y: 55 }
  },
  "21": {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [74, 0], [74, 90], [0, 90]],
    rotation: 3,
    solarPosition: { x: 25, y: 35 },
    positionPercent: { x: 57, y: 32 }
  },
  "25": {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [70, 0], [70, 70], [0, 70]],
    rotation: 4,
    solarPosition: { x: 25, y: 25 },
    positionPercent: { x: 33, y: 35 }
  },
  "27": {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [72, 0], [72, 64], [0, 64]],
    rotation: 3,
    solarPosition: { x: 25, y: 20 },
    positionPercent: { x: 32, y: 54 }
  }
}

// Adds the houseSizes in pixels to the objects in the helper list
Object.values(houseShapes).forEach(shape => {
  const box = calculateHouseSize(shape.points)
  shape.width = box.width
  shape.height = box.height
})