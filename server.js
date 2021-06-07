const path = require('path');
const express = require('express');
const sequelize = require('./config/connection');
const { ppid } = require('process');
const routes = require('./controllers');
const session = require('express-session');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitiated: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const app = express();
const PORT = process.env.PORT || 3001;

// set up and run handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// // add controllers (routes)
// app.use(require('./controllers'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session(sess));

app.use(routes);

sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true })
.then(function(results) {
  sequelize.sync({ force: false })
})
.then(() => {
  app.listen(PORT, () => console.log(`now listening on port ${PORT}`));
});