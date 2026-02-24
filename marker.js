let trail = [];

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	angleMode(DEGREES);
}

function draw() {
	background(255, 1);
	frameRate(30);
	translate(-width / 2, -height / 2);

	trail.push([mouseX, mouseY]);

	if (trail.length > 15) {
		trail.shift();
	}

	brush.set("marker", "#4ad6af", 0.25);

	brush.spline(trail);
}
