const express = require('express');
const sequelize = require('./config/connection');
// added this
const exphbs = require('express-handlebars');
// added this
const hbs = exphbs.create({});


const app = express();
const PORT = process.env.PORT || 3001;

// set up and run handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// add controllers (routes)
app.use(require('./controllers'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`now listening on port ${PORT}`));
});