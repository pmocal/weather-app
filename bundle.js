(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const WEATHERAPIKEY = "8ff6609c0d5be817ee767f3b6b050249";
const GIPHYAPIKEY = "JPATCxkiYzTOAR7667lKYr7ZmxWKQdaD";

function getWeatherObject(city) {

	fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=" + WEATHERAPIKEY, {mode: 'cors'})
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      document.getElementById("result").innerHTML = city + " " + response.weather[0].main + " " + response.main.temp;
      fetchGIFs(response.weather[0].main);
    })
    .catch(err => alert("Enter a valid 'city,country'!"))

}

async function fetchGIFs(searchTerm) {
  
  var loadingDiv = addLoadingScreen();
  
  try {
    
    const response = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=JPATCxkiYzTOAR7667lKYr7ZmxWKQdaD&s='
      + searchTerm, {mode: 'cors'})
    const responseJson = await response.json();

    var img = document.createElement('img');
    img.src = responseJson.data.images.original.url;
    img.id = "result2";
    if (document.getElementById("result2") == null) {   
      var div = document.createElement('div');
      div.className = "flex";
      div.id = "result2";
      div.appendChild(img);
      console.log(div);
      document.body.appendChild(div);
    } else {
      var element = document.getElementById("result2");
      var parent = element.parentNode;
      parent.removeChild(element);
      parent.appendChild(img);
    }
  
  } catch(error) {
    console.log('There has been a problem with your fetch operation: ', error.message);
  };

  removeLoadingScreen(loadingDiv);
}

function addLoadingScreen() {
  var div = document.createElement('div');
  div.className = "flex";
  var img = document.createElement('img');
  img.src = "loading....svg"
  div.appendChild(img);
  document.body.appendChild(div);
  return div;
}

function removeLoadingScreen(div) {
  document.body.removeChild(div);
}

document.getElementById("loadanother").addEventListener("click", function(event){
	event.preventDefault();
  getWeatherObject(document.getElementById("input").value);
});
},{}]},{},[1]);
