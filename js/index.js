
let findInput = document.querySelector(".findInput");
let Clear = document.querySelector(".Clear");
let today = document.querySelector(".today");
let date = document.querySelector(".date");
let tomorrow = document.querySelector(".tomorrow");
let dayAfterTom = document.querySelector(".dayAfterTom");
let countryName = document.querySelector(".countryName");
let weatherStatus = document.querySelector(".weatherStatus");
let todaysDegree = document.querySelector(".todaysDegree");
let todaysIcon = document.querySelector(".todaysIcon");
let rainChance = document.querySelector(".rainChance");
let airSpeed = document.querySelector(".airSpeed");
let countrylocation = document.querySelector(".countrylocation");
// Btn
// let homeBtn = document.querySelector(".homeBtn")
// let contactBtn = document.querySelector(".contactBtn")
// let brand = document.querySelector(".navbar-brand")
// homeBtn.onclick = ()=> window.open("../index.html", "_self")
// brand.onclick = ()=> window.open("../index.html", "_self")
// contactBtn.onclick = ()=> window.open("../contact.html", "_self")
//tomorrow
let tomorroIcon = document.querySelector(".tomorroIcon");
let tomorrowDegreeMax = document.querySelector(".tomorrowDegreeMax");
let tomorrowDegreeMin = document.querySelector(".tomorrowDegreeMin");
let tomorrowStatus = document.querySelector(".tomorrowStatus");

//DayAfterTomorrow
let dayAfterTomorrowIcon = document.querySelector(".dayAfterTomorrowIcon");
let dayAfterTomorrowDegMax = document.querySelector(".dayAfterTomorrowDegMax");
let dayAfterTomorrowDegMin = document.querySelector(".dayAfterTomorrowDegMin");
let dayAfterTomorrowStatus = document.querySelector(".dayAfterTomorrowStatus");

var weatherArr = []
//focus on load on input
window.onload = () => findInput.focus();
// Time

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var d = new Date();
var dayName = days[d.getDay()];
var dayNum = d.getDate()
var tomorrowName = days[((d.getDay() + 0) % 6)];
var dayAfterTomorrow = days[((d.getDay() + 1) % 6)];
var month = d.getMonth() + 1
var monthName = monthNames[d.getMonth()]

today.innerHTML = dayName;
date.innerHTML = dayNum + " " + monthName;
tomorrow.innerHTML = tomorrowName;
dayAfterTom.innerHTML = dayAfterTomorrow;
///////////////////////////////////////////

findInput.addEventListener("keyup", function () {

    var httpReq = new XMLHttpRequest();
    httpReq.open("GET", `https://api.weatherapi.com/v1/forecast.json?key=c803a225c5d34601b47165902231502&q=${findInput.value}&days=7`)
    httpReq.send()

    httpReq.addEventListener("readystatechange", function () {

        if (httpReq.readyState == 4 && httpReq.status == 200) {
            weatherArr = JSON.parse(httpReq.response)
            // Today
            countryName.innerHTML = (weatherArr.location.name)
            todaysDegree.innerHTML = (weatherArr.current.temp_c)
            weatherStatus.innerHTML = (weatherArr.current.condition.text)
            todaysIcon.src = weatherArr.current.condition.icon;
            rainChance.innerHTML = (weatherArr.forecast.forecastday[0].day.daily_chance_of_rain)
            airSpeed.innerHTML = (weatherArr.current.wind_kph);
            countrylocation.innerHTML = (weatherArr.location.tz_id);
            //Tomorrow
            tomorroIcon.src = weatherArr.forecast.forecastday[1].day.condition.icon;
            tomorrowDegreeMax.innerHTML = (weatherArr.forecast.forecastday[1].day.maxtemp_c)
            tomorrowDegreeMin.innerHTML = (weatherArr.forecast.forecastday[1].day.mintemp_c)
            tomorrowStatus.innerHTML = (weatherArr.forecast.forecastday[1].day.condition.text)
            //Day After Tomorrow
            dayAfterTomorrowIcon.src = weatherArr.forecast.forecastday[2].day.condition.icon;
            dayAfterTomorrowDegMax.innerHTML = (weatherArr.forecast.forecastday[2].day.maxtemp_c)
            dayAfterTomorrowDegMin.innerHTML = (weatherArr.forecast.forecastday[2].day.mintemp_c)
            dayAfterTomorrowStatus.innerHTML = (weatherArr.forecast.forecastday[2].day.condition.text)
        }
    })
    Clear.onclick = function () {
        findInput.value = "";

    }
})
