const cityName = ""
const showDelhi = document.querySelector('.show-delhi')
const showKolkata = document.querySelector('.show-kolkata')
const showBangalore = document.querySelector('.show-bangalore')
const cityNameElement = document.querySelectorAll('.city-name')
const searchCityBtn = document.querySelector('#search-city')
const KELVIN = 273.15


showDelhi.addEventListener('click', function(event){
    event.preventDefault()
    getGeoCode("delhi")
})
showKolkata.addEventListener('click', function(event){
    event.preventDefault()
    getGeoCode("kolkata")
})
showBangalore.addEventListener('click', function(event){
    event.preventDefault()
    getGeoCode("bangalore")
})


searchCityBtn.addEventListener('click', function(event){
  event.preventDefault()
  getGeoCode(document.querySelector('#city-input').value);
})


/* OPEN WEATHER API */
function getWeather(lat, lon){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b66275312722953c97e7418fd1b405c4`)
  .then((response) => response.json())
  .then((response) => {
    console.log(response)
    const min_temp = response.main.temp_min - KELVIN
    const max_temp = response.main.temp_max - KELVIN
    const feels_like = response.main.feels_like - KELVIN
    const humidity = response.main.humidity
    const visibility = response.visibility / 1000
    const weather = response.weather[0].description
    const weatherIcon = response.weather[0].icon
    const cityName = response.name
    const countryCode = response.sys.country
    document.querySelector('.city-name').textContent = `${cityName}, ${countryCode}`
    document.querySelector('.card-img-top').src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
    document.querySelector('.weather-description').textContent = `${weather}`
    document.querySelector('.temperature').textContent = `${Math.ceil(feels_like)}\u2103`
    document.querySelector('.max-temp').textContent = `${Math.ceil(max_temp)} \u2103`
    document.querySelector('.min-temp').textContent = `${Math.ceil(min_temp)} \u2103`
    document.querySelector('.humidity').textContent = `${humidity}%`
    document.querySelector('.visibility').textContent = `${visibility}km`    
  })
}

function getGeoCode(city){
  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=b66275312722953c97e7418fd1b405c4`)
  .then((response) => response.json())
  .then((response) =>{
    console.log(response)
    const lat = response[0].lat
    const lon = response[0].lon
    getWeather(lat, lon)
  })
  .catch((err) => console.error(err))
}

getGeoCode(cityName)


const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  const crd = pos.coords;
  getWeather(crd.latitude, crd.longitude)
}

function error(err) {
  alert(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);