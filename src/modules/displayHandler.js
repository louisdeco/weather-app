import fetchWeatherData from "./fetchWeatherData.js";

const displayHandler = (function () {
  const init = async () => {
    const results = await fetchWeatherData.init();
    if (results.success) {
      displayWeatherData(results.data);
    } else {
      displayError(results.error);
    }
  };

  function displayWeatherData(results) {
    const unit = {
      metric: {
        wind: "KM/H",
        temperature: "°C",
      },
      us: {
        wind: "MPH",
        temperature: "°F",
      },
    };

    const {
      resolvedAddress,
      currentConditions: { temp, conditions, feelslike, humidity, windspeed },
    } = results;

    const descriptionDom = document.querySelector(".description");
    const locationDom = document.querySelector(".location");
    const tempDom = document.querySelector(".temperature");
    const tempUnitDom = document.querySelector(".temp-unit");
    const feelsLikeDom = document.querySelector(".feels-like");
    const feelsLikeUnitDom = document.querySelector(".feels-like-unit");
    const windDom = document.querySelector(".wind");
    const humidityDom = document.querySelector(".humidity");

    descriptionDom.textContent = conditions;
    locationDom.textContent = resolvedAddress;
    tempDom.textContent = temp;
    tempUnitDom.textContent = unit.metric.temperature;
    feelsLikeDom.textContent = `FEELS LIKE ${feelslike}`;
    feelsLikeUnitDom.textContent = unit.us.temperature;
    windDom.textContent = `WIND: ${windspeed} ${unit.metric.wind}`;
    humidityDom.textContent = `HUMIDITY: ${humidity}%`;
  }

  function displayError(errorMessage) {
    console.log(errorMessage);
  }

  return { init, displayWeatherData };
})();

export default displayHandler;
