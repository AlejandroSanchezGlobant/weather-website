var rpn = require("request-promise-native");
const weatherKey = "8bea2cba7464a71046e3e15ec73603d9";

module.exports = async (location) => {
  let data, current;

  const options = {
    uri: "http://api.weatherstack.com/current",
    qs: {
      access_key: weatherKey,
      query: location,
      units: "m",
    },
    json: true, // Automatically parses the JSON string in the response
  };

  try {
    const { error, current } = await rpn(options);

    if (error) {
      return {
        error: "No results",
        data: undefined,
      };
    } else {
      const { temperature, feelslike } = current;

      return {
        error: undefined,
        data: {
          temperature,
          feelslike,
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
