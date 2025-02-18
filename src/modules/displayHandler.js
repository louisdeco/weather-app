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

  function displayWeatherData(results, unitGroup = "metric") {
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

    updateElement(".description", conditions);
    updateElement(".location", resolvedAddress);
    updateElement(".temperature", temp);
    updateElement(".temp-unit", unit[unitGroup].temperature);
    updateElement(".feels-like", `FEELS LIKE ${feelslike}`);
    updateElement(".feels-like-unit", unit[unitGroup].temperature);
    updateElement(".wind", `WIND: ${windspeed} ${unit[unitGroup].wind}`);
    updateElement(".humidity", `HUMIDITY: ${humidity}%`);
  }

  function updateElement(selector, content) {
    const element = document.querySelector(selector);
    if (element) element.textContent = content;
  }

  function displayError(errorMessage) {
    console.log(errorMessage);
  }

  return { init, displayWeatherData, displayError };
})();

export default displayHandler;
