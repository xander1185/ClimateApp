const API_KEY = "3b6992e3b1ad1ca9bb299809b7557e73";

const fetchData = (position) => {
  const { latitude, longitude } = position.coords;
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => setWeatherData(data));
};

const setWeatherData = (data) => {
  console.log(data);
  const weatherData = {
    location: data.name,
    description: data.weather[0].main,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    temperature: data.main.temp,
    date: getDate(),
  };

  /*seteo las info en html con un forEach que recorre  nuestro objeto weatherData (las key serian los data, o sea los datos)*/
  Object.keys(weatherData).forEach((key) => {
    document.getElementById(key).textContent = weatherData[key];
  });

  cleanUp();
};

/*esto es para que si no carga la info se vea un spinner/loader y cuando ya la info llega se quita el loader y se carga toda la info*/
const cleanUp = () => {
  let container = document.getElementById("container");
  let loader = document.getElementById("loader");

  loader.style.display = "none";
  container.style.display = "flex";
};

const getDate = () => {
  let date = new Date();
  return `${date.getDate()}-${("0" + (date.getMonth() + 1)).slice(
    -2
  )} -${date.getFullYear()}`;
};

const onLoad = () => {
  navigator.geolocation.getCurrentPosition(fetchData);
};
