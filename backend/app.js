const express = require('express');
const routes = require('./routes/routes');
const auth = require("./controllers/auth.js")();

require('./db');

const app = express();
port = process.env.PORT || 3000;

app.use(express.json());
app.use(auth.initialize());
app.use(routes);
app.listen(port);

console.log('API server started on: ' + port);