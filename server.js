const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true })
.then(function(results) {
  sequelize.sync({ force: true })
})
.then(() => {
  app.listen(PORT, () => console.log(`now listening on port ${PORT}`));
});