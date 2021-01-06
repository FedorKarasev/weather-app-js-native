// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

// SELECT ELEMENTS

const iconEl = document.querySelector('.weather-icon');
const tempEl = document.querySelector('.temperature-value p');
const descriptionEl = document.querySelector('.temperature-description p');
const locationEl = document.querySelector('.location p');
const notificationEl = document.querySelector('.notification');

// App data

const weather = {};

weather.temperature = {
    unit : 'celsius',
};

// APP CONSTS AND VARS

const KELVIN = 273;

// API KEY

const apiKey = '5131f785595a7dbb2e5f721c00417bf6';

// CHECK GEO BROWSER SUPPORT

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationEl.style.display = 'block';
    notificationEl.innerHTML = '<p>Ваш браузер не поддерживает геолокацию</p>'
}

function setPosition(position) {

    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

function showError(err) {
    notificationEl.style.display = 'block';
    notificationEl.innerHTML = `<p>${err.message}</p>`
}

function getWeather(latitude, longitude) {

    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    fetch(api)
    .then(data => {
        return data.json();
    })
    .then(data => {
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(() => displayWeather())

}

function displayWeather() {
    iconEl.innerHTML = `<img src='icons/${weather.iconId}.png'>`;
    tempEl.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descriptionEl.innerHTML = weather.description;
    locationEl.innerHTML = `${weather.city}, ${weather.country}`;
}

tempEl.addEventListener('click', event => {
    
    if (weather.temperature.value === undefined) {
        return;
    } else if (weather.temperature.unit == 'celsius') {
        weather.temperature.unit = 'farenheit';
        tempEl.innerHTML = `${Math.floor((weather.temperature.value * 9 / 5) + 32)}°<span>F</span>`
        console.log(weather)
    } else if (weather.temperature.unit == 'farenheit') {
        weather.temperature.unit = 'celsius';
        tempEl.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        console.log(weather)
    }
});