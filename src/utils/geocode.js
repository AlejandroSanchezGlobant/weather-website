var rpn = require("request-promise-native");
const locationKey =
  "pk.eyJ1IjoiYWVvbmZlbml4IiwiYSI6ImNrOTRyazd3MzA0NnIzcW81YXpuY2xtcTEifQ.uYcI17dsWxQa3vYnqOTwPg";

module.exports = async (location, limit = 1) => {
  let data, results;
  const options = {
    uri: `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`,
    qs: {
      access_token: locationKey,
      limit: limit,
    },
    json: true, // Automatically parses the JSON string in the response
  };

  try {
    location = encodeURIComponent(location);
    const { features: results } = await rpn(options);

    if (results.length === 0) {
      return {
        error: "No results",
        data: undefined,
      };
    } else {
      place = results[0];
      const [longitude, latitude] = place.center;

      return {
        error: undefined,
        data: {
          longitude,
          latitude,
          location: place.place_name,
        },
      };
    }
  } catch (error) {
    return {
      error: error.statusCode
        ? "Http error " + error.statusCode
        : "Not connected",
      data: undefined,
    };
  }
};
