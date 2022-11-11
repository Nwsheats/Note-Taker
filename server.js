const express = require('express');
const api = require('./routes/apiroutes')
const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.static('public'));

//routes

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);












app.listen(PORT, () =>
  console.log(`App listening on port ${PORT}!`)
);


// Heroku link: https://vast-sea-91544.herokuapp.com/
// https://git.heroku.com/vast-sea-91544.git