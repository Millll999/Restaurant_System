const express = require('express');
const session = require('express-session');
const cors = require('cors');

const signupRouter = require('./controllers/signUp.js');
const loginRouter = require('./controllers/login.js');
const resetRouter = require('./controllers/reset.js');
const homeRouter = require('./controllers/main.js');
const reserveRouter = require('./controllers/reserve.js');
const savoryRouter = require('./controllers/savoryMenu.js');
const dessertRouter = require('./controllers/dessertMenu.js');
const drinkRouter = require('./controllers/drinkMenu.js');
const pathRouter = require('./controllers/path.js');
const addToCartRouter = require('./controllers/addToCart.js');
const addOrder = require('./controllers/addOrder.js');
const deleteRouter = require('./controllers/delete.js');

const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views/images'));
app.use(express.static('utils'));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

app.use(signupRouter);
app.use(loginRouter);
app.use(resetRouter);
app.use(homeRouter);
app.use(reserveRouter);
app.use(savoryRouter);
app.use(dessertRouter);
app.use(drinkRouter);
app.use(pathRouter);
app.use(addToCartRouter);
app.use(addOrder);
app.use(deleteRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});