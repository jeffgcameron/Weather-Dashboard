var searchButton = document.getElementById("search-button");
var cityInput = document.querySelector("#city-input");
var cityContainer = document.querySelector("#city");
var dateContainer = document.querySelector("#date")
var tempContainer = document.querySelector("#temp");
var humidContainer = document.querySelector("#humid");
var windContainer = document.querySelector("#wind");
var uvContainer = document.querySelector("#uv");
var recent = document.querySelector(".recent");
var day1 = document.querySelector(".day1");
var day2 = document.querySelector(".day2");
var day3 = document.querySelector(".day3");
var day4 = document.querySelector(".day4");
var day5 = document.querySelector(".day5");

var storage = JSON.parse(localStorage.getItem("previous search")) || [];

function sumbitCity() {
    
    var cityName = cityInput.value.trim();

   
    storage.push(cityName);
    localStorage.setItem("previous search", JSON.stringify(storage));
    
    if (cityName) {
        getCityWeather(cityName);
        getForcast(cityName);
        cityContainer.textContent = cityInput.value.toUpperCase();

    } else {
        alert("Please enter a city");
    }
};

for(var i = 0; i < storage.length; i++) {
    createButton(storage[i]);
    
}

function createButton(recentSearches) {
    var recentButton = document.createElement("button");
    recentButton.innerHTML = recentSearches;
    recent.appendChild(recentButton);
    recentButton.classList = "list-item flex-row justify-space-between align-center";

}

var getCityWeather = function (city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=ed9fb803413e55142ef073bf436a5cb4";
    
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    tempContainer.textContent = "Temperature: " + data.main.temp + "°F";
                    humidContainer.textContent = "Humidity: " + data.main.humidity + "%";
                    windContainer.textContent = "Wind Speed: " + data.wind.speed + "mph";  
                    displayWeather(data, city)
                });

            } else {
                alert("Error" + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to find city")
        });

};

var displayWeather = function (weather) {
    if(weather.length === 0) {
        cityContainer.textContent = "No city found";
        return;
    }

    for(var i = 0; i < weather; i++) {
        var cityWeather = data.weather[i].main.temp;
        tempContainer.textContent = cityWeather;
    }
}


var sumbitForcast = function(event) {
    event.preventDefault();
    var cityName = cityInput.value.trim();

};

var getForcast = function (forcast) {
    var forcastApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + forcast + "&units=imperial&appid=ed9fb803413e55142ef073bf436a5cb4";
    
    fetch(forcastApi)
        .then(function (forcastResponse) {
            if (forcastResponse.ok) {
                console.log(forcastResponse);
                forcastResponse.json().then(function (forcastData) {
                    console.log(forcastData);
                    console.log(forcastData.city.name);
                    day1.textContent = "Date: " + forcastData.list[2].dt_txt  + "\n" + "Temp: " + forcastData.list[2].main.temp  + "°F"  + "\n" + "Humidity: " + forcastData.list[2].main.humidity +"%";
                    day2.textContent = "Date: " + forcastData.list[10].dt_txt  + "\n" + "Temp: " + forcastData.list[10].main.temp  + "°F"  + "\n" + "Humidity: " + forcastData.list[10].main.humidity +"%";
                    day3.textContent = "Date: " + forcastData.list[18].dt_txt  + "\n" + "Temp: " + forcastData.list[18].main.temp  + "°F"  + "\n" + "Humidity: " + forcastData.list[18].main.humidity +"%";
                    day4.textContent = "Date: " + forcastData.list[26].dt_txt  + "\n" + "Temp: " + forcastData.list[26].main.temp  + "°F"  + "\n" + "Humidity: " + forcastData.list[26].main.humidity +"%";
                    day5.textContent = "Date: " + forcastData.list[34].dt_txt  + "\n" + "Temp: " + forcastData.list[34].main.temp  + "°F"  + "\n" + "Humidity: " + forcastData.list[34].main.humidity +"%";
                });
            } 
        });

};

// var displayForcast = function (weatherForcast) {
//  for (var i = 0; i < weatherForcast; i + 8) {
//      var cityWeatherForcast = data.weatherForcast[i];
//      dateContainer.textContent = cityWeatherForcast
//  }
// }

searchButton.addEventListener("click", sumbitCity);

//when i seach for a city, it prepends the city name to the recent searches bar.
    //store in local storage and display on the dom
    //these buttons will be clickable and will properly search for the info of the saved city

//when i search for a city, I will diplsya the api information in the main section fo teh dom
    //it will display the
        //1. city name and date
        //2. current temperature
        //3. current humidity
        //4. current wind speed
        //5. current UV index

//when i seach for a city, i will display the api information for the next five day
    //for each day, i will display the
        //1. new date
        //2. the emoji for sunny, cloudy, rainy, snowy, partially cloudy.
        //3. the forcasted temp
        //4. the forcasted humidity

//get weather api