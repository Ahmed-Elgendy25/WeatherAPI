const BASE_URL = `http://api.weatherapi.com/v1/forecast.json`;
const API = `?key=5a195f4749d748c18e2122423241701`;
let demo = document.getElementById('demo');
let searchLocation = document.getElementById('searchLocation');
let findBtn = document.getElementById('findBtn');
async function getForecast(country = 'cairo') {
  try {
    let req = await fetch(
      `${BASE_URL}${API}&q=${country}&days=3&aqi=no&alerts=no`
    );
    let res = await req.json();
    console.log(res);
    displayWeather(res);
  } catch (error) {
    console.log(error);
  }
}

getForecast();

findBtn.addEventListener('click', function () {
  getForecast(searchLocation.value);
});

function handleInputChange() {
  let searchLocation = document.getElementById('searchLocation');

  // Get the value of the input
  let inputValue = searchLocation.value;
  getForecast(inputValue);
}

function displayWeather(data) {
  let cartona = ``;
  let {
    location: { name },
    current: {
      temp_c,
      condition: { text, icon, code },
    },
    forecast: { forecastday },
  } = data;

  let date = forecastday[0].date;
  let tomorrowDate = forecastday[1].date;
  let after2Days = forecastday[2].date;

  const dateObject = new Date(date);
  const tomorrowDateObject = new Date(tomorrowDate);
  const after2DaysObject = new Date(after2Days);

  const options = { day: 'numeric', month: 'long', weekday: 'long' };

  const formattedDate = dateObject.toLocaleDateString('en-US', options);
  const formattedTomorrowDate = tomorrowDateObject.toLocaleDateString(
    'en-US',
    options
  );

  const formattedafter2Days = after2DaysObject.toLocaleDateString(
    'en-US',
    options
  );

  const [dayString, dayAndMonth] = formattedDate.split(', ');
  const [month, day] = dayAndMonth.split(' ');

  const [dayStringTomorrow, dayAndMonthTomorrow] =
    formattedTomorrowDate.split(', ');
  const [month2, day2] = dayAndMonthTomorrow.split(' ');

  const [dayStringAfter2Days, dayAndMonthAfter2Days] =
    formattedafter2Days.split(', ');
  const [month3, day3] = dayAndMonthAfter2Days.split(' ');
  cartona = `

    <div class="col-md-4">
  
    <div class="title d-flex align-items-center p-2 text-white-50 rounded-top-1"
      style="background-color: #2D303D;">
      <h3 class="fs-5">${dayString}</h3>
      <h4 class="fs-5 ms-auto">${day} ${month}</h4>
    </div>
  
    <div class="details d-flex justify-content-evenly flex-column h-100 px-3 py-3" style="background-color: #323544;">
      <p class="text-white-50 fs-5">${name}</p>
  
      <div class="d-flex justify-content-between align-items-center">
        <h1 class="text-white fw-bolder " id="degree">${temp_c}°C </h1>
        <img src="${icon}" class="w-25 " alt="${text}" />
      </div>
  
   

      <div class=" my-5">
      <p style="color: #009ad8;" class="my-3">${text}</p>
      <span class="text-white-50 me-3">
      <i class="fa-solid fa-umbrella"></i>
      20%
      </span>
     

      <span class="text-white-50  me-3">
      <i class="fa-solid fa-wind"></i>
      18km/h
      </span>
     
     
      <span class="text-white-50">
      <i class="fa-regular fa-compass"></i>
      East
      </span>

      </div>
    </div>
  
  
  </div>
  
  
  
  <div class="col-md-4 ">
  
    <div class="title d-flex align-items-center justify-content-center p-2 text-white-50 rounded-top-1"
      style="background-color: #222531;">
      <h3 class="fs-5 text-center">${dayStringTomorrow}</h3>
  
    </div>
  
    <div class="details h-100  px-3  py-5"" style="background-color: #262936;">
  
  
      <div class="d-flex flex-column justify-content-between gap-1 align-items-center">
        <img src="${forecastday[1].day.condition.icon}" style="width: 15%;" alt="sunny" />
        <h1 class="text-white fw-bolder fs-5 " id="">${forecastday[1].day.maxtemp_c}°C</h1>
        <span class="text-white-50">${forecastday[1].day.mintemp_c}°</span>
        <span style="color: #009ad8;" class="text-center  ">${forecastday[1].day.condition.text}</span>
  
  
      </div>
  
  
    </div>
  
  
  
  
  </div>
  
  
  
  <div class="col-md-4">
  
    <div class="title d-flex align-items-center justify-content-center p-2 text-white-50 rounded-top-1"
      style="background-color: #2D303D  ;">
      <h3 class="fs-5 text-center">${dayStringAfter2Days}</h3>
  
    </div>
  
    <div class="details p-3 h-100 px-3  py-5"" style="background-color: #323544;">
  
  
      <div class="d-flex flex-column justify-content-between gap-1 align-items-center">
        <img src="${forecastday[2].day.condition.icon}" style="width: 15%;" alt="sunny" />
        <h1 class="text-white fw-bolder fs-5 " id="">${forecastday[2].day.maxtemp_c}°C </h1>
        <span class="text-white-50">${forecastday[2].day.mintemp_c}°</span>
        <span style="color: #009ad8;" class="text-center  ">${forecastday[2].day.condition.text}</span>
  
  
      </div>
  
  
    </div>
  
  
  </div>


    `;
  demo.innerHTML = cartona;
}
