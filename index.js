const express = require('express');
const mainRouter = require('./routes/mainRouter');
const ownerRouter = require('./routes/ownersRouter');
const cookieParser = require('cookie-parser');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
require('./config/mongooseConfiguration');

app.set("veiw engine" , "ejs")
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser())
app.use("/" , mainRouter);
app.use("/owner" , ownerRouter);

app.listen(3000);