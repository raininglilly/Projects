const SHAPE_SIZE = 160; //changed shape size from 130 to 160
const PADDING = SHAPE_SIZE * 0.35; //changed padding from 0.25 to 0.35
const GRIDBOX = SHAPE_SIZE + PADDING; 
const START = SHAPE_SIZE / 2 + PADDING / 2;

// Define background and line colors
const BACKGROUND_COLOUR = "#332a69"; // changed background color from #1c2021 to #332a69
const DISTRICT_LINE_COLOUR = '#7fdbe3'; // changed color for District Line from #5bb958 to #7fdbe3
const CIRCLE_LINE_COLOUR = '#fcf39a'; // changed color for Circle Line from #ffe352 to #fcf39a
const HAMMERSMITH_CITY_LINE_COLOUR = '#ffd6f9'; // changed color for Hammersmith & City Line from #f4b2a2 to #ffd6f9
const METROPOLITAN_LINE_COLOUR = '#bafcae'; // changed color for Metropolitan Line from #c9586a to #bafcae

// Variables for animation angles and state
let angleDistrict = 0;
let angleHammersmith = 0;
let animatingDistrict = true; // Flag to control which animation is active

function setup() {
  // Create the canvas with window dimensions
  createCanvas(windowWidth, windowHeight);
  // Set angle mode to degrees for easier rotation calculations
  angleMode(DEGREES);
  // Set the frame rate
  frameRate(60);
};

function draw() {
  // Set the background color
  background(BACKGROUND_COLOUR);

  // Calculate the number of columns and rows based on canvas size and grid box size
  const columns = Math.ceil(width / GRIDBOX);
  const rows = Math.ceil(height / GRIDBOX);

  // Loop through each grid cell
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      // Calculate the position of the current grid cell's center
      const posX = START + x * GRIDBOX;
      const posY = START + y * GRIDBOX;

      // Alternate drawing patterns based on grid position (x+y is even or odd)
      if ((x + y) % 2 === 0) {
        // Draw the District and Circle Line pattern
        drawDistrictAndCircleLine(posX, posY, y % 2 === 0, angleDistrict);
      } else {
        // Draw the Hammersmith and City Line pattern
        drawHammersmithAndCityLine(posX, posY, angleHammersmith);
      }
    }
  }

  // Handle the animation state and update angles
  if (animatingDistrict) {
    // Animate District Line pattern
    if (frameCount % 10 === 0) { // Update angle every 10 frames
      angleDistrict += 45;
      if (angleDistrict >= 360) {
        angleDistrict = 0; // Reset angle
        animatingDistrict = false; // Switch to animating Hammersmith pattern
      }
    }
  } else {
    // Animate Hammersmith and City Line pattern
    if (frameCount % 10 === 0) { // Update angle every 10 frames
      angleHammersmith += 45;
      if (angleHammersmith >= 360) {
        angleHammersmith = 0; // Reset angle
        animatingDistrict = true; // Switch back to animating District pattern
      }
    }
  }
};

// Function to draw the District and Circle Line pattern
function drawDistrictAndCircleLine(x, y, isNormalOrder, angle) {
  push(); // Save the current drawing state
  translate(x, y); // Move the origin to the center of the grid cell
  rotate(angle); // Rotate the drawing context
  noStroke(); // Disable drawing outlines

  // Define dimensions for the rectangles
  const rectWidth = 20;
  const rectHeight = 60;

  // Set the background color as fill (appears as gaps)
  fill(BACKGROUND_COLOUR);

  // Draw two rectangles representing the lines, alternating their order
  if (isNormalOrder) {
    fill(CIRCLE_LINE_COLOUR);
    rect(-30, -30, rectWidth, rectHeight); // Draw Circle Line rectangle
    fill(DISTRICT_LINE_COLOUR);
    rect(10, -30, rectWidth, rectHeight); // Draw District Line rectangle
  } else {
    fill(DISTRICT_LINE_COLOUR);
    rect(-30, -30, rectWidth, rectHeight); // Draw District Line rectangle
    fill(CIRCLE_LINE_COLOUR);
    rect(10, -30, rectWidth, rectHeight); // Draw Circle Line rectangle
  }
  pop(); // Restore the previous drawing state
}

// Function to draw the Hammersmith and City Line pattern
function drawHammersmithAndCityLine(x, y, angle) {
  push(); // Save the current drawing state
  translate(x, y); // Move the origin to the center of the grid cell
  rotate(angle); // Rotate the drawing context
  noStroke(); // Disable drawing outlines

  // Define dimensions for the rectangles
  const rectWidth = 60;
  const rectHeight = 20;

  // Draw two rectangles representing the lines
  fill(HAMMERSMITH_CITY_LINE_COLOUR);
  rect(-30, -30, rectWidth, rectHeight); // Draw Hammersmith & City Line rectangle
  fill(METROPOLITAN_LINE_COLOUR);
  rect(-30, 10, rectWidth, rectHeight); // Draw Metropolitan Line rectangle

  pop(); // Restore the previous drawing state
}
