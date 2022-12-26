const cloud_pct = document.querySelector('.cloud-pct')
const feels_like = document.querySelector('.feel-like-temp')
const humidity = document.querySelector('.humidity')
const max_temp = document.querySelector('.max-temp')
const min_temp = document.querySelector('.min-temp')
const temp = document.querySelector('.temperatue')
const wind_degrees = document.querySelector('.wind-degree')
const wind_speed = document.querySelector('.wind-speed')
const showDelhi = document.querySelector('.show-delhi')
const showKolkata = document.querySelector('.show-kolkata')
const showBangalore = document.querySelector('.show-bangalore')
const cityNameElement = document.querySelectorAll('.city-name')
const searchCityBtn = document.querySelector('#search-city')



showDelhi.addEventListener('click', function(event){
    event.preventDefault()
    getWeather('delhi'); 
})
showKolkata.addEventListener('click', function(event){
    event.preventDefault()
    getWeather('kolkata');
})
showBangalore.addEventListener('click', function(event){
    event.preventDefault()
    getWeather("bangalore");
})

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "61c3215823msh1ce21b5e6bce66ap117f52jsn985a699a8370",
    "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
  },
};

function getWeather(city){
  fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`,options)
  .then((response) => response.json())
  .then((response) => {
    cityNameElement[0].innerHTML = city;
    cityNameElement[1].innerHTML = city;
    cloud_pct.innerHTML = `${response.cloud_pct} `;
    feels_like.innerHTML = `${response.feels_like} \u2103`;
    humidity.innerHTML = `${response.humidity} `;
    max_temp.innerHTML = `${response.max_temp} \u2103`;
    min_temp.innerHTML = `${response.min_temp} \u2103`;
    temp.innerHTML = `${response.temp} \u2103`;
    wind_degrees.innerHTML = `${response.wind_degrees} \u00B0`;
    wind_speed.innerHTML = `${response.wind_speed} Km/hr`;
    console.log(response);
  })
  .catch((err) => console.error(err));
}


searchCityBtn.addEventListener('click', function(event){
  event.preventDefault()
  getWeather(document.querySelector('#city-input').value);
})