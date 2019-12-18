var nconf = require('nconf');
nconf.argv()
  .env()
  .file({ file: 'config.json' });


const WEATHERAPIKEY = nconf.get("WEATHERAPIKEY")
const GIPHYAPIKEY = nconf.get("GIPHYAPIKEY")

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