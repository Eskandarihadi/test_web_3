
const ex = require('express');
const app = ex();
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const methodOverride = require('method-override');
const confing = require('./confing');
const mongoose = require('mongoose');
const passport = require('passport')
const { Result } = require('express-validator');
const MongoStore = require('connect-mongo');


require('dotenv').config();

mongoose.connect('mongodb://127.0.0.1:27017/mydb');



global.confing = require('./confing');



//confings
app.use(ex.static(__dirname + '/public'));
app.use(ex.urlencoded({ extended: false }));
app.set('view engine', 'ejs')
app.use(methodOverride('method'))
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  secret: process.env.SESSINON_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie : {expires : new Date(Date.now() + 1000 * 3600 * 24 * 100)},
  store: MongoStore.create({
    mongoUrl : 'mongodb://127.0.0.1:27017/mydb'
  })
}))

app.use(flash());


require('./passport/passport_local');
app.use(passport.initialize())
app.use(passport.session())


//midel wears





app.use((req,res,next)=>{
  res.locals = {errors : req.flash('errors'),show : req};
  next()
})
app.use('/', require('./routers/master_router'));





//post listening
app.listen(confing.port, () => console.log('******app listening******'));