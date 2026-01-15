const express = require('express');
const app = express();
const _app_folder = 'dist/angular-core/browser';
const _port = 4200;
// ---- SERVE STATIC FILES ---- //
app.get('*.*', express.static(_app_folder, {maxAge: '1y'}));

// ---- SERVE APPLICATION PATHS ---- //
app.all('*', function (req, res) {
  res.status(200).sendFile(`/`, {root: _app_folder});
});

// ---- START UP THE NODE SERVER  ----
app.listen(_port, function () {
  console.log(
    'Node Express server for ' +
      app.name +
      ' listening on http://localhost:' +
      _port,
  );
});
