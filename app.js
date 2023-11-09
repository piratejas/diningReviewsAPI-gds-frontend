const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');

const app = express();
const port = 3000;


// Configure Nunjucks
nunjucks.configure([
    "node_modules/govuk-frontend/",
    "app/views"
  ], {
  autoescape: true,
  express: app,
});

app.use(express.static(path.join(__dirname, "public")));
app.use('/assets', express.static(path.join(__dirname, 'node_modules/govuk-frontend/govuk/assets')));
app.use('/govuk-frontend', express.static(path.join(__dirname, 'node_modules/govuk-frontend/govuk')));

// Define a route
app.get('/', (req, res) => {
  res.render('index.njk');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
