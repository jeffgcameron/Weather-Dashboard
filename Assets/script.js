var searchButton = document.getElementById("search-button");
var cityInput = document.querySelector("#city-input");
var cityContainer = document.querySelector("#city");
var dateContainer = document.querySelector("#date")
var tempContainer = document.querySelector("#temp");
var humidContainer = document.querySelector("#humid");
var windContainer = document.querySelector("#wind");
var uvContainer = document.querySelector("#uv");
var recent = document.querySelector(".recent");

var storage = JSON.parse(localStorage.getItem("previous search")) || [];

function sumbitCity() {
    
    var cityName = cityInput.value.trim();

   
    storage.push(cityName);
    localStorage.setItem("previous search", JSON.stringify(storage));
    
    if (cityName) {
        getCityWeather(cityName);
        getForcast(cityName);
        cityContainer.textContent = "City: " + cityInput.value ;

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

var displayWeather = function (weather, searchTerms) {
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
    var forcastApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + forcast + "&appid=ed9fb803413e55142ef073bf436a5cb4";
    
    fetch(forcastApi)
        .then(function (forcastResponse) {
            if (forcastResponse.ok) {
                console.log(forcastResponse);
                forcastResponse.json().then(function (forcastData) {
                    console.log(forcastData);

                    
                    displayWeather(forcastData, forcast)
                });
            } 
        });

};

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