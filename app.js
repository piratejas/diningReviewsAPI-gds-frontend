const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const nunjucks = require('nunjucks');
const path = require('path');

const indexRouter = require("./app/routes/index");
const userRouter = require("./app/routes/user");
const adminRouter = require("./app/routes/admin");

const app = express();
const port = process.env.PORT || 3000;

nunjucks.configure([
    "node_modules/govuk-frontend/",
    "app/views/"
  ], {
  autoescape: true,
  express: app,
});

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, "public")));
app.use('/assets', express.static(path.join(__dirname, 'node_modules/govuk-frontend/govuk/assets')));
app.use('/govuk-frontend', express.static(path.join(__dirname, 'node_modules/govuk-frontend/govuk')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.listen(port, ipAddress, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;