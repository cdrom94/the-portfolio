const load = () => {
	info();
	// init();
	let i = 0;
	if (i === 0) {
		i = 1;
		let update = document.querySelector('#progress-update');
		let bar = document.querySelector('#progress-bar');
		let width = 0;
		const frame = () => {
			let id = setInterval(frame, 10);
			if (width >= 100) {
				clearInterval(id);
				i = 0;
				setTimeout(() => {
					bar.style.visibility = 'hidden';
					TweenLite.to('#preloader', { opacity: 0, duration: 6 });
				}, 1000);
			} else {
				width++;
				update.style.width = width + '%';
			}
		};
	}
};

const info = () => {
	const success = position => {
		let lat = position.coords.latitude;
		let lon = position.coords.longitude;
		weatherCall(lat, lon);
	};
	const error = err => {
		let message = ['geolocation denied.', 'position unavailable.', 'timeout.'];
		document.querySelector('#current-weather').innerHTML = err.code + ': ' + message[err.code - 1] + "<br/> That's cool. A window works too.";
		document.querySelector('#current-weather').style.textAlign = 'left';
	};
	navigator.geolocation.getCurrentPosition(success, error);
};

const weatherCall = (lat, lon) => {
	fetch('https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + lon)
		.then(response => {
			return response.json();
		})
		.then(data => {
			updateDOM(lat, lon, data);
		})
		.catch(() => {
			document.querySelector('#current-weather').innerHTML = 'Sorry. There was an error, please try again later.';
		});
};

const updateDOM = (lat, lon, data) => {
	let name = data.name,
		country = data.sys.country,
		temperature = data.main.temp,
		currentWeather = data.weather[0].description.toLowerCase();
	document.querySelector('#name').innerHTML = name;
	document.querySelector('#country').innerHTML = country;
	document.querySelector('#fahrenheit').innerHTML = Math.round(temperature * (9 / 5) + 32) + 'F';
	document.querySelector('#celsius').innerHTML = Math.round(temperature) + 'C';
	document.querySelector('#current-weather').innerHTML = currentWeather;
	let coordLength = 4;
	let printLat = lat.toFixed(coordLength),
		printLon = lon.toFixed(coordLength);
	document.querySelector('#lat').innerHTML = lat >= 0 ? printLat + 'N' : -printLat + 'S';
	document.querySelector('#lon').innerHTML = lon >= 0 ? printLon + 'E' : -printLon + 'W';
	startTime();
};

const startTime = () => {
	let today = new Date(),
		month = today.getMonth(),
		day = today.getDate(),
		year = today.getFullYear(),
		hours = today.getHours(),
		minutes = today.getMinutes(),
		seconds = today.getSeconds();
	minutes = formatClockNumbers(minutes);
	seconds = formatClockNumbers(seconds);
	document.querySelector('#clock').innerHTML = hours + ':' + minutes + ':' + seconds;
	document.querySelector('#month').innerHTML = month + 1;
	document.querySelector('#day').innerHTML = day;
	document.querySelector('#year').innerHTML = year;
	setTimeout(startTime, 500);
};

const formatClockNumbers = i => {
	if (i < 10) {
		i = '0' + i;
	}
	return i;
};

//Audio Controls
let audio = document.querySelector('audio');
let toggle = document.querySelector('#toggle');
let play = false;
audio.pause();
document.querySelector('#volume-up').addEventListener('click', () => {
	audio.volume += 0.1;
});

//ajust buttons on click
toggle.addEventListener('click', () => {
	if (play) {
		stopAnimation();
		// activeVolume = audio.volume;
		fade();
		// audio.pause();
		toggle.innerHTML = 'play';
		play = !play;
	} else {
		// audio.play();
		rise();
		playAnimation();
		toggle.innerHTML = 'pause';
		play = !play;
	}
});

//fade volume in/out on click
const fade = () => {
	if (audio.volume >= 0.1) {
		audio.volume -= 0.1;
		setTimeout(fade, 50);
	} else {
		audio.pause();
	}
};
const rise = () => {
	audio.play();
	if (audio.volume < 1) {
		audio.volume += 0.1;
		setTimeout(rise, 50);
	}
};

if (document.readyState !== 'complete') {
	load();
}

//stop animation and audio when page is not visible
document.addEventListener('visibilitychange', () => {
	if (document.hidden && play) {
		audio.pause();
		stopAnimation();
		toggle.innerHTML = 'play';
		play = !play;
	}
});

//volume down
document.querySelector('#volume-down').addEventListener('click', () => {
	audio.volume -= 0.1;
});
