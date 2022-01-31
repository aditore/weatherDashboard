//https://openweathermap.org/api/one-call-api
//variables
var citySearchForm = document.querySelector('#citySearch');
var citySearchBtn = document.querySelector('#citySearchBtn');
var clearHistory = document.querySelector('#clearHistory');

var cWeather = document.querySelector('#currentWeather');
var cCity = document.querySelector('#currentCity');
var forecast = document.querySelector('fiveDays');

var apiKey = "806d132b07e1078e02e5d0735b73fdc7";
var searchHistoryLi = [];

//search for city
$('#citySearchBtn').on('click', function(event) {
    event.preventDefault();

    var city = $('#citySearch').val().trim();
    currentWeather(city);

    if (!searchHistoryLi.includes(city)) {
        searchHistoryLi.push(city);
        var newSearch = document.createElement('li')
        newSearch.classList = 'list-group-item';
        newSearch.innerText = city;

        $('#searchHistory').append(newSearch);
    };

    localStorage.setItem('cities', JSON.stringify(searchHistoryLi));
    console.log(searchHistoryLi);
})
//function for getting api

function currentWeather(city) {

    var openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(openWeatherUrl)
        .then(function(response) {
            response.json()
        .then(function(data) {
            getWeather(data, city);
            
        });
    });
   
}

function getWeather(weather, searchCity) {
    //clear
    //cWeather.textContent = "";
    cCity.textContent = searchCity;
    

    console.log(weather);

    //date
    var currentDate = document.createElement('span');
    currentDate.textContent = ' ( ' + moment(weather.dt.value).format('MMM D, YYYY') + ' ) ';
    $('#currentCity').append(currentDate);

    //icon
    var icon = document.createElement('img');
    icon.setAttribute('src', `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    icon.setAttribute('alt', 'weatherIcon');
    $('#currentCity').append(icon);

    //temperature
    var tempV = document.createElement('li');
    tempV.textContent = 'Temperature today is: ' + weather.main.temp + ' °K';
    tempV.classList = 'list-group-item';
    $('#currentWeather').append(tempV);

    //humidity
    var humidityV = document.createElement('li');
    humidityV.textContent = 'Humidity: ' + weather.main.humidity + '%';
    humidityV.classList = 'list-group-item';
    $('#currentWeather').append(humidityV);

    //windspeed
    var windV = document.createElement('li');
    windV.textContent = 'Wind Speed: ' + weather.wind.speed + ' MPH';
    windV.classList = 'list-group-item';
    $('#currentWeather').append(windV);

//UV finds the latitude and longitude of the given city and plugs it into seperate function
    var lat = weather.coord.lat;
    var lon = weather.coord.lon;

    uvIndex(lat, lon);
}

//UV index api call
function uvIndex(lat, lon) {
    var openWeatherUrlLatLon = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;

    fetch(openWeatherUrlLatLon)
    .then(function(response) {
        response.json().then(function(data) {
            displayUvIndex(data);
        });
    });
}

function displayUvIndex(index) {
    var uvIndexV = document.createElement('div');
    uvIndexV.textContent = 'UV Index: ';
    uvIndexV.classList = 'list-group-item';

    var uvIndexValue = document.createElement('li');
    uvIndexValue.textContent = index.value;

    if (index.value <= 2) {
        uvIndexValue.classList = 'favorable';
    } else if (index.value > 2 && index.value <= 8) {
        uvIndexValue.classList = 'moderate';
    } else {
        uvIndexValue.classList = 'severe';
    }

    uvIndexV.appendChild(uvIndexValue);

    $('#currentWeather').append(uvIndexV);
}