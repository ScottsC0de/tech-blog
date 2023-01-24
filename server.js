const express = require('express');
const app = express();

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const path = require('path');

const session = require('express-session');
const exphbs = require('express-handlebars');

const sess = {
    secret: 'Super secret secret',
    resave: false,
    saveUninitialized: false,
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

const PORT = process.env.PORT || 3001; // heroku

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});