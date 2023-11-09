const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');

const indexRouter = require("./app/routes/index");

const app = express();
const port = 3000;


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

app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;