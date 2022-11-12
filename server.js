const express = require('express');
const apiRoutes = require('./routes/apiroutes')
const htmlRoutes = require('./routes/htmlroutes')
const PORT = process.env.PORT || 3001;
const app = express();




//routes

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use('/api', api);

app.use('/api', apiRoutes)
app.use('/api', htmlRoutes)




app.listen(PORT, () =>
  console.log(`App listening on port ${PORT}!`)
);


// Heroku link: https://vast-sea-91544.herokuapp.com/
// https://git.heroku.com/vast-sea-91544.git