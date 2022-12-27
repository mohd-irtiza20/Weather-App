const API_KEY = `22a1da615de637dc0ba6f65d7f1d8d99`;
const form = document.querySelector("form");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");
// const API = `https://api.openweathermap.org/data/2.5/weather?
// q=${city}&appid=${API_KEY}&units=metric`
// const IMG_URL = `https: //openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

const getWeather = async (city) => {
  if (city == "") {
    weather.innerHTML = `<h2> City Field cannot be Empty </h2>`;
    return;
  }
  weather.innerHTML = `<h2> Loading... <h2>`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return showWeather(data);
};

const showWeather = (data) => {
  if (data.cod == "404") {
    weather.innerHTML = `<h2> City Not Found <h2>`;
    return;
  }
  weather.innerHTML = `
        <div>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
        </div>
        <div>
            <h2>${data.main.temp} ℃</h2>
            <h4> ${data.weather[0].main} </h4>
            <h4> ${data.weather[0].description} </h4>
        </div>
    `;
};

form.addEventListener("submit", function (event) {
  let inputCity = search.value;
  let validCity = inputCity.trim();
  console.log(validCity);
  //   if (validCity == "") {
  //     weather.innerHTML = `<h2> City Field Blank <h2>`;
  //     return;
  //   }
  getWeather(validCity);
  event.preventDefault();
});
