console.log('app starting...!');

const express = require('express');
const database = require('./models/database');
const jwt = require('jsonwebtoken');
const userRepository = require('./repositories/userRepository');

const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const logoutController = require('./controllers/logoutController');
const homeController = require('./controllers/homeController');

const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const path = require('path');
const Handlebars = require('handlebars');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');
const { extname } = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(cookieParser());

app.use(bodyParser.json());

app.set('views', path.join(__dirname, '/views/'));

app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/layouts',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  }),
);

app.set('view engine', 'hbs');

database.initializeMongo();

app.listen(3000, function () {
  console.log('Signup app is listening to the port 3000');
});

//Validate token
app.use(async (req, res, next) => {
  if (req.headers['x-access-token']) {
    const accessToken = req.headers['x-access-token'];
    const { _id, exp } = await jwt.verify(
      accessToken,
      process.env.TOKEN_SECRET,
    );
    // Check if token has expired
    if (exp < Date.now().valueOf() / 1000) {
      return res.status(401).json({
        error:
          'JWT token has expired, please login to obtain a new one',
      });
    }
    res.locals.loggedInUser = await userRepository.findUserById(_id);
    next();
  } else {
    next();
  }
});

app.use('/v1/user', userController);

app.use('/logout', logoutController);

app.use('/login', loginController);

app.use('/', homeController);
