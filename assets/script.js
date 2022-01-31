//https://openweathermap.org/api/one-call-api
//variables
var citySearchForm = document.querySelector('#citySearch');
var citySearchBtn = document.querySelector('#citySearchBtn');
var clearHistory = document.querySelector('#clearHistory');
var cityName = document.querySelector('#cityName');
var cityPic = document.querySelector('#cityPic');
var temp = document.querySelector('#temperature');
var humidity = document.querySelector('#humidity');
var windSpeed = document.querySelector('#windSpeed');
var uvIndex = document.querySelector('#uvIndex');
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
        newSearch.innerText = city;

        $('#searchHistory').append(newSearch);
    };

    localStorage.setItem('city', JSON.stringify(searchHistoryLi));
    console.log(searchHistoryLi);
})
//function for getting api

function currentWeather(city) {

    var openWeatherUrl = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(openWeatherUrl)
        .then(function(response) {
            response.json()
        .then(function(data) {
            getWeather(data);
            
        });
    });
   
}