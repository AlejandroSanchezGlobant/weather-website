const geocode = require('./geocode');
const forecast = require('./forecast');

const getWeatherByLocation = async (address) => {
  if (!address) {
    console.log('Please provide a location');

    return {
      error: 'Please provide a location',
      data: undefined,
    };
  }

  let locationData, coordinates, weatherData;

  locationData = await geocode(address);

  if (locationData.error) {
    console.log(locationData.error);
    return {
      error: locationData.error,
      data: undefined,
    };
  } else {
    // Cargar datos de clima
    const { latitude, longitude, location } = locationData.data;

    coordinates = `${latitude},  ${longitude}`;
    weatherData = await forecast(coordinates);

    if (weatherData.error) {
      console.log(weatherData.error);

      return {
        error: locationData.error,
        data: undefined,
      };
    } else {
      const { temperature, feelslike } = weatherData.data;
      console.log(
        `In ${location}, latitude: ${latitude}, longitude: ${longitude} is ${temperature} degrees and it feels like ${feelslike} degrees`
      );

      return {
        error: undefined,
        data: {
          location,
          temperature,
          feelslike,
        },
      };
    }
  }
};

module.exports = getWeatherByLocation;
