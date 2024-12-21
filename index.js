const express = require('express');
const mainRouter = require('./routes/mainRouter');
const ownerRouter = require('./routes/ownersRouter');
const cookieParser = require('cookie-parser');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const serverless = require('serverless-http');
const flash = require('connect-flash');
require('./config/mongooseConfiguration');
require('dotenv').config();

app.set("veiw engine" , "ejs")
app.use(session({
  secret: `${process.env.JWT_KEY}`,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
      mongoUrl: `${process.env.DB_URI}`,
      collectionName: 'sessions',
  }),
}));
app.use(flash());
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser())
app.use("/" , mainRouter);
app.use("/owner" , ownerRouter);

app.listen(3000);
module.exports = serverless(app)