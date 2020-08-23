if (document.readyState !== 'complete') {load();}
function load() {
  info();
  init();
  var i = 0;
  if (i === 0){
    i = 1;
    var update = document.querySelector('#progress-update');
    var bar = document.querySelector('#progress-bar');
    var width = 0;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
        setTimeout(function(){
          bar.style.visibility = 'hidden';
          TweenLite.to('#preloader', {opacity: 0, duration: 6});
        }, 1000);
      } else {
        width ++;
        update.style.width = width + '%';
      }
    }
  }
}
function info(){
    navigator.geolocation.getCurrentPosition(success, error);
    function success(position){
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      weatherCall(lat,lon);
    }
    function error(err){
      var message = ['geolocation denied.', 'position unavailable.', 'timeout.' ];
      document.querySelector('#current-weather').innerHTML = (err.code + ': ' + message[err.code - 1] + '<br/> That\'s cool. A window works too.');
      document.querySelector('#current-weather').style.textAlign = 'left';
    }
}
function weatherCall(lat, lon) {
  fetch('https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + lon)
          .then(function(response){
              return response.json();
          })
          .then(function(data){
            updateDOM(lat, lon, data);
          })
          .catch(function(){
              document.querySelector('#current-weather').innerHTML = 'Sorry. There was an error, please try again later.'; 
          });
}
function updateDOM(lat, lon, data) {
  var name = data.name,
      country = data.sys.country,
      temperature = data.main.temp,
      currentWeather = data.weather[0].description.toLowerCase();
      document.querySelector('#name').innerHTML = (name);
      document.querySelector('#country').innerHTML = (country);
      document.querySelector('#fahrenheit').innerHTML = (Math.round((temperature * (9/5) + 32)) + 'F');
      document.querySelector('#celsius').innerHTML = (Math.round(temperature) + 'C');
      document.querySelector('#current-weather').innerHTML = (currentWeather);
  var coordLength = 4;
  var printLat = lat.toFixed(coordLength),
      printLon = lon.toFixed(coordLength);
  document.querySelector('#lat').innerHTML = (lat >= 0 ? printLat + 'N' : -printLat + 'S');
  document.querySelector('#lon').innerHTML = (lon >= 0 ? printLon + 'E' : -printLon + 'W');
  startTime();
}
function startTime() {
  var today = new Date(),
      month = today.getMonth(),
      day = today.getDate(),
      year = today.getFullYear(),
      hours = today.getHours(),
      minutes = today.getMinutes(),
      seconds = today.getSeconds();
  minutes = adjust(minutes);
  seconds = adjust(seconds);
  document.querySelector('#clock').innerHTML = hours + ':' + minutes + ':' + seconds;
  document.querySelector('#month').innerHTML = month + 1;
  document.querySelector('#day').innerHTML = day;
  document.querySelector('#year').innerHTML = year;
  setTimeout(startTime, 500);
}
function adjust(i) {
  if (i < 10) {i = '0' + i;}
  return i;
} 
//Audio Controls
var audio = document.querySelector('audio');
var toggle = document.querySelector('#toggle');
var play = false;
audio.pause();
document.querySelector('#volume-up').addEventListener('click', function(){
  audio.volume += 0.1;
});
//ajust buttons on click
toggle.addEventListener('click', function(){
  if(play){
    stopAnimation();
    // activeVolume = audio.volume;
    fade();
    // audio.pause();
    toggle.innerHTML = 'play';
    play = !play;
  }
  else{
    // audio.play();
    rise();
    playAnimation();
    toggle.innerHTML = 'pause';
    play = !play;
  }
});
//fade volume in/out on click
function fade(){
  if(audio.volume >= 0.1){
      audio.volume -= 0.1;
      setTimeout(fade, 50);
  }else{
      audio.pause();
  }
}
function rise(){
  audio.play();
  if(audio.volume < 1){
      audio.volume += 0.1;
      setTimeout(rise, 50);
  }
}
//stop animation and audio when page is not visible
document.addEventListener("visibilitychange", function(){
  if(document.hidden && play){
    audio.pause();
    stopAnimation();
    toggle.innerHTML = 'play';
    play = !play;
  }
});
//volume down
document.querySelector('#volume-down').addEventListener('click', function(){
  audio.volume -= 0.1;
});

