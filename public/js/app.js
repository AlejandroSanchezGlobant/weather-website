const weatherForm = document.getElementById('weather-form');
const addressInput = document.getElementById('address');

const loadingContainer = document.getElementById('loading');
const locationContainer = document.getElementById('location');
const forecastContainer = document.getElementById('forecast');
const errorContainer = document.getElementById('error');

const clearHTML = () => {
  loadingContainer.innerText = '';
  locationContainer.innerText = '';
  forecastContainer.innerText = '';
  errorContainer.innerText = '';
};

weatherForm.addEventListener('submit', async (e) => {
  let response, data;
  const address = addressInput.value;

  e.preventDefault();
  clearHTML();
  loadingContainer.innerText = 'Loading...';

  response = await fetch(`/weather?address=${address}`);
  data = await response.json();
  clearHTML();

  if (data.error) {
    errorContainer.innerText = data.error;
  } else {
    locationContainer.innerText = `${data.location} \n Latitude: ${data.latitude}, Longitude: ${data.longitude}`;

    forecastContainer.innerText = `It's ${data.localtime} (UTC ${data.utc_offset}). It's ${data.temperature}°C and it feels like ${data.feelslike}°C.`;
  }
});
