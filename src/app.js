const path = require('path');
const express = require('express');
const hbs = require('hbs');

const getWeatherByLocation = require('./utils/getWeather');

const app = express();
const port = process.env.PORT || 3000;
const author = 'Alejandro Sánchez';

// Define paths for Express config
const publicFolder = path.join(__dirname, '../public');
const templatesFolder = path.join(__dirname, '../templates/views');
const partialsFolder = path.join(__dirname, '../templates/partials');

// Setup handlenbars engine and views location
app.set('view engine', 'hbs');
app.set('views', templatesFolder);
hbs.registerPartials(partialsFolder);

// Setup static directory to serve
app.use(express.static(publicFolder));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: author,
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    img: '/images/cat.png',
    name: author,
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'Placeholder for help page',
    name: author,
  });
});

app.get('/weather', async ({ query }, res) => {
  let response;

  if (query.address) {
    const { data, error } = await getWeatherByLocation(query.address);
    if (error) {
      response = {
        error,
      };
    } else {
      response = data;
    }
  } else {
    response = {
      error: 'You must provide an address',
    };
  }

  res.json(response);
});

app.get('/help/*', (req, res) => {
  res.render('not-found', {
    title: '404',
    errorMessage: 'Help page not found',
    name: 'Ale',
  });
});

app.get('*', (req, res) => {
  res.render('not-found', {
    title: '404',
    errorMessage: 'Page not found',
    name: 'Ale',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
