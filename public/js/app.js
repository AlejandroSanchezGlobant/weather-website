const weatherForm = document.getElementById('weather-form');
const addressInput = document.getElementById('address');
const dataContainer = document.getElementById('data');

weatherForm.addEventListener('submit', async (e) => {
  let response, data;
  const address = addressInput.value;

  e.preventDefault();
  response = await fetch(`/weather?address=${address}`);
  data = await response.json();

  if (data.error) {
    dataContainer.innerHTML = `<div class="label">${data.error}</div>`;
  } else {
    dataContainer.innerHTML = `<div class="location">${data.location}</div>
      <div class="label">Temperature: ${data.temperature}°C</div>
      <div class="label">Feels Like: ${data.feelslike}°C</div>`;
  }
});
