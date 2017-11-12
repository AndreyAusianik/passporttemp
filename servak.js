const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('./static'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({ secret: 'woff woff', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({usernameField: 'login', passwordField: 'password'}, (login, password, done) => {
    if(login == 'login' && password == 'password') {
        return done(null, {login, password, position: 'molodec'});
    }
    return done(null, false);
}));

passport.serializeUser(function(user, done) {
    done(null, user.login);
});

passport.deserializeUser(function(login, done) {
    done(null, {login, password: 'password'});
});

app.post('/auth', passport.authenticate('local'), (req, res) => { res.json(req.user)});

const requireAuthMiddleware = (req, res, next) => {
    if(req.isAuthenticated()) return next();
    res.status(403).end();
};


const products = express.Router();
products.get('/', (req, res) => {
   res.json([
       'ris',
       'kasha',
       'katleti'
   ]);
});


app.use('/products', requireAuthMiddleware, products);



app.listen(3000);