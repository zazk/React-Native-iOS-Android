var Canvas = require('canvas');
var Image = Canvas.Image
var objectdetect = require('./compare/objectdetect');
var canvas = new Canvas();

var context = canvas.getContext('2d');
var size = 250;
var detector;
var classifier = objectdetect.frontalface;

function detectFaces(canvas) {
    // Detect faces in the image:
    var rects = detector.detect(canvas);
    
    // Draw rectangles around detected faces:
    for (var i = 0; i < rects.length; ++i) {
        var coord = rects[i];
        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle = 'rgba(0, 255, 255, 0.75)';
        context.rect(coord[0], coord[1], coord[2], coord[3]);
        context.stroke();
    } 
    console.log("Rects", rects);
}

function loadImage(src) {
    image = new Image();

    image.onload = function() {
        canvas.width = ~~(size * image.width / image.height);
        canvas.height = ~~(size);
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
        detector = new objectdetect.detector(canvas.width, canvas.height, 1.2, classifier);
        detectFaces(canvas);
    }
    image.src = src;
}

function handleFileSelect(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    
    reader.onload = function(e) {
        loadImage(e.target.result);
    };
    reader.readAsDataURL(file);
}

function handleClassifierSelect(e) {
    classifier = objectdetect[e.target.value];
    detector = new objectdetect.detector(canvas.width, canvas.height, 1.2, classifier);
    canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
    detectFaces(canvas);
}

loadImage('img/faces.jpg');