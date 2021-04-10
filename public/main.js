//COLORING APP FUNCTIONALITY
const canvas = document.getElementById("canvas");
canvas.width = 400;
canvas.height = 600;

let context = canvas.getContext("2d");

// make_base();

// function make_base() {
//   base_image = new Image();
//   base_image.src = "/assets/IMG_3963.JPG";
//   base_image.onload = function () {
//     context.drawImage(base_image, 0, 0);
//   };
// }

let start_background_color = "white";
context.fillStyle = start_background_color;
context.globalAlpha = 0.5;
context.fillRect(0, 0, canvas.width, canvas.height);

let draw_color = "black";
let draw_width = "2";
let is_drawing = false;

let restore_array = [];
let index = -1;

function change_color(element) {
  draw_color = element.style.backgroundColor;
}

//for mobile
canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("touchstop", stop, false);
//for cpu
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseup", stop, false);

const offSetX = 10;
const offSetY = 78.5;

function start(event) {
  const canvasX = canvas.getBoundingClientRect().left;
  const canvasY = canvas.getBoundingClientRect().top;
  is_drawing = true;
  context.beginPath();
  context.moveTo(event.clientX - canvasX, event.clientY - canvasY);
  event.preventDefault();
}

function draw(event) {
  if (is_drawing) {
    const canvasX = canvas.getBoundingClientRect().left;
    const canvasY = canvas.getBoundingClientRect().top;
    context.lineTo(event.clientX - canvasX, event.clientY - canvasY);
    context.strokeStyle = draw_color;
    context.lineWidth = draw_width;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
  }
}

function stop(event) {
  if (is_drawing) {
    context.stroke();
    context.closePath();
    is_drawing = false;
  }
  event.preventDefault();

  if (event.type != "mouseout") {
    restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;
  }
}

function clear_canvas() {
  context.fillStyle = start_background_color;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(0, 0, canvas.width, canvas.height);

  restore_array = [];
  index = -1;
}

function undo_last() {
  if (index <= 0) {
    clear_canvas();
  } else {
    index -= 1;
    restore_array.pop();
    context.putImageData(restore_array[index], 0, 0);
  }
}

//Changing Background Image
function changeImage(event) {
  console.log(event.srcElement.id);
  const imageClicked = event.srcElement.src;
  const canvasImage = document.getElementById("canvasImage");
  canvasImage.removeAttribute("src");
  canvasImage.setAttribute("src", imageClicked);
  console.log(imageClicked);
  clear_canvas();
}

function downloadCanvas() {
  // get canvas data
  var image = canvas.toDataURL();

  // create temporary link
  var tmpLink = document.createElement("a");
  tmpLink.download = "image.png"; // set the name of the download file
  tmpLink.href = image;

  // temporarily add link to body and initiate the download
  document.body.appendChild(tmpLink);
  tmpLink.click();
  document.body.removeChild(tmpLink);
}
