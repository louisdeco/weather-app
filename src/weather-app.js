import "./css/styles.css";

const fetchWeatherData = (function () {
  const init = async (city = "Paris", unitGroup = "metric") => {
    const safeGetWeatherData = withErrorHandling(getWeatherData);
    const result = await safeGetWeatherData(city, unitGroup);
    return result;
  };

  async function getWeatherData(city, unitGroup) {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${unitGroup}&key=35JFJ6CSLRCFSD3EBAXLC9JDJ&contentType=json`,
      { mode: "cors" },
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Error! Status: ${response.status}, Details: ${errorText}`,
      );
    }
    const weatherData = await response.json();
    return weatherData;
  }

  function withErrorHandling(asyncFn) {
    return async function (...args) {
      try {
        const result = await asyncFn(...args);
        return {
          success: true,
          data: result,
        };
      } catch (error) {
        console.error(error.message);
        return {
          success: false,
          error: error.message,
        };
      }
    };
  }

  return { init };
})();

const displayHandler = (function () {
  const init = async () => {
    const results = await fetchWeatherData.init();
    if (results.success) {
      displayWeatherData(results.data);
    } else {
      displayError(results.error);
    }
    searchCity();
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

  async function searchCity() {
    const searchForm = document.querySelector("#weatherForm");
    const cityInput = document.querySelector("#cityInput");
    searchForm.addEventListener("keypress", async (event) => {
      if (event.key == "Enter") {
        event.preventDefault();
        const city = cityInput.value.trim();
        const results = await fetchWeatherData.init(city || "Paris", "metric");
        console.log(results);
        if (results.success) {
          displayWeatherData(results.data);
        } else {
          displayError(results.error);
        }
      }
    });
  }

  function displayError(errorMessage) {
    console.log(errorMessage);
  }

  return { init };
})();

displayHandler.init();
