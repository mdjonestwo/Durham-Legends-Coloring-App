//COLORING APP FUNCTIONALITY
const canvas = document.getElementById("canvas");
canvas.width = 400;
canvas.height = 600;

let context = canvas.getContext("2d");

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

function openModal() {
  const modal = document.querySelector(".modal");
  modal.setAttribute("style", "display: block");
}

function closeModal() {
  const modal = document.querySelector(".modal");
  modal.setAttribute("style", "display: none");
}

var imageClicked;

//Changing Background Image
function changeImage(event) {
  console.log(event.srcElement.src);
  imageClicked = event.srcElement.src;

  return imageClicked;
}

function okBtn() {
  const canvasImage = document.getElementById("canvasImage");
  canvasImage.removeAttribute("src");
  canvasImage.setAttribute("src", imageClicked);
  clear_canvas();
  closeModal();
}

function preview() {
  html2canvas(document.getElementById("canvasSaver")).then(function (canvas) {
    document.body.appendChild(canvas);
  });
}

function download() {
  domtoimage
    .toBlob(document.getElementById("canvasSaver"))
    .then(function (blob) {
      window.saveAs(blob, "my-node.png");
    });
}
