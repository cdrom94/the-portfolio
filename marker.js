let trail = [];

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	angleMode(DEGREES);

	brush.set("marker", "#4ad6af", 0.4);
}

function draw() {
	background(255, 1);
	frameRate(60);
	translate(-width / 2, -height / 2);

	if (mouseX !== 0 || mouseY !== 0) {
		trail.push([pmouseX, pmouseY]);
	}

	if (trail.length > 40) {
		trail.shift();
	}

	brush.spline(trail);
}
