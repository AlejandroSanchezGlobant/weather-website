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
      const {
        localtime,
        utc_offset,
        temperature,
        feelslike,
      } = weatherData.data;

      return {
        error: undefined,
        data: {
          location,
          latitude,
          longitude,
          localtime,
          utc_offset,
          temperature,
          feelslike,
        },
      };
    }
  }
};

module.exports = getWeatherByLocation;
