/*
points = shape of the house [[upper left corner x, y], [up right corner], [bottom right], [bottom left]]
rotation = rotation of house
solarPosition = position of solar panel relative to house
positionPercent = position of house on the map
*/

export const houseShapes = {
  "1": {
    // ∨∨∨ points [UL], [UR], [BR], [BL]
    points: [[0, 0], [85, 0], [85, 80], [0, 80]],
    rotation: 1,
    solarPosition: { x: 30, y: 30 },
    positionPercent: { x: 79, y: 80 }
  },
  "3": {
    // ∨∨∨ points [⌜], [⌝], [⌟], [⌞]
    points: [[0, 0], [90, 0], [90, 80], [0, 80]],
    rotation: 3,
    solarPosition: { x: 35, y: 30 },
    positionPercent: { x: 76, y: 80 }
  },
  "5": {
    // ∨∨∨ points [◰], [◳], [◲], [◱]
    points: [[0, 0], [77, 0], [74, 80], [0, 80]],
    rotation: 3,
    solarPosition: { x: 28, y: 30 },
    positionPercent: { x: 61.9, y: 80 }
  },
  "7": {
    // ∨∨∨ points [↖], [↗], [↘], [↙]
    points: [[0, 0], [65, 0], [63, 96], [0, 95]],
    rotation: 3,
    solarPosition: { x: 25, y: 40 },
    positionPercent: { x: 51, y: 79.1 }
  },
  "9": {
    points: [[0, 0], [75, 0], [76, 68], [63, 68], [62, 91], [0, 90]],
    rotation: 3,
    solarPosition: { x: 27, y: 35 },
    positionPercent: { x: 40.8, y: 79 }
  },
  "11": {
    points: [[0, 0], [100, 0], [68, 44], [0, 44]],
    rotation: 3,
    solarPosition: { x: 34, y: 18 },
    positionPercent: { x: 22, y: 80 }
  },

  "15": {
    points: [[0, 0], [82, 0], [82, 52], [0, 52]],
    rotation: 0,
    solarPosition: { x: 41, y: 20 },
    positionPercent: { x: 12, y: 36 }
  },
  "20B": {
    points: [[0, 0], [60, 0], [60, 36], [36, 60], [0, 60]],
    rotation: 0,
    solarPosition: { x: 30, y: 18 },
    positionPercent: { x: 26, y: 36 }
  },
  "20A": {
    points: [[0, 0], [64, 0], [64, 40], [0, 40]],
    rotation: 0,
    solarPosition: { x: 32, y: 18 },
    positionPercent: { x: 36, y: 36 }
  },
  "20": {
    points: [[0, 0], [88, 0], [88, 56], [0, 56]],
    rotation: 0,
    solarPosition: { x: 44, y: 22 },
    positionPercent: { x: 46, y: 36 }
  },

  "18": {
    points: [[0, 0], [72, 0], [72, 46], [0, 46]],
    rotation: 0,
    solarPosition: { x: 36, y: 18 },
    positionPercent: { x: 58, y: 36 }
  },
  "16": {
    points: [[0, 0], [66, 0], [66, 42], [0, 42]],
    rotation: 0,
    solarPosition: { x: 33, y: 18 },
    positionPercent: { x: 70, y: 36 }
  },
  "14": {
    points: [[0, 0], [78, 0], [78, 50], [0, 50]],
    rotation: 0,
    solarPosition: { x: 39, y: 20 },
    positionPercent: { x: 82, y: 36 }
  },

  "10": {
    points: [[0, 0], [58, 0], [58, 38], [0, 38]],
    rotation: 0,
    solarPosition: { x: 29, y: 16 },
    positionPercent: { x: 14, y: 62 }
  },
  "8": {
    points: [[0, 0], [70, 0], [70, 48], [0, 48]],
    rotation: 0,
    solarPosition: { x: 35, y: 18 },
    positionPercent: { x: 28, y: 62 }
  },
  "6": {
    points: [[0, 0], [62, 0], [62, 40], [0, 40]],
    rotation: 0,
    solarPosition: { x: 31, y: 18 },
    positionPercent: { x: 42, y: 62 }
  },
  "4": {
    points: [[0, 0], [76, 0], [76, 52], [0, 52]],
    rotation: 0,
    solarPosition: { x: 38, y: 20 },
    positionPercent: { x: 56, y: 62 }
  },
  "2": {
    points: [[0, 0], [84, 0], [84, 54], [0, 54]],
    rotation: 0,
    solarPosition: { x: 42, y: 22 },
    positionPercent: { x: 70, y: 62 }
  },

  "17": {
    points: [[0, 0], [60, 0], [60, 36], [0, 36]],
    rotation: 0,
    solarPosition: { x: 30, y: 16 },
    positionPercent: { x: 84, y: 62 }
  },
  "19": {
    points: [[0, 0], [68, 0], [68, 44], [0, 44]],
    rotation: 0,
    solarPosition: { x: 34, y: 18 },
    positionPercent: { x: 10, y: 84 }
  },
  "21": {
    points: [[0, 0], [74, 0], [74, 48], [0, 48]],
    rotation: 0,
    solarPosition: { x: 37, y: 20 },
    positionPercent: { x: 26, y: 84 }
  },
  "25": {
    points: [[0, 0], [80, 0], [80, 50], [0, 50]],
    rotation: 0,
    solarPosition: { x: 40, y: 20 },
    positionPercent: { x: 44, y: 84 }
  },
  "27": {
    points: [[0, 0], [70, 0], [70, 46], [0, 46]],
    rotation: 0,
    solarPosition: { x: 35, y: 18 },
    positionPercent: { x: 10, y: 10 }
  }
};
