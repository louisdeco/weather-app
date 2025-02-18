import fetchWeatherData from "./fetchWeatherData.js";

const displayHandler = (function () {
  const DOM = {
    error: document.querySelector(".error"),
    weather: document.querySelector(".weather-info"),
    loading: document.querySelector(".loading"),
  };

  const init = async () => {
    setDisplayState(DOM.loading);
    const results = await fetchWeatherData.init();
    if (results.success) {
      displayWeatherData(results.data);
    } else {
      displayError(results.error);
    }
  };

  function setDisplayState(elementToShow) {
    const elements = [DOM.error, DOM.weather, DOM.loading];
    elements.forEach((element) => {
      element.classList.toggle("not-displayed", element !== elementToShow);
    });
  }

  function displayWeatherData(results, unitGroup = "metric") {
    setDisplayState(DOM.weather);
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
    setDisplayState(DOM.error);
    DOM.error.textContent = errorMessage;
  }

  return { init, displayWeatherData, displayError, setDisplayState, DOM };
})();

export default displayHandler;
