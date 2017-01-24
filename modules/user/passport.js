var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

// Configure Passport to use Auth0
var strategy = new Auth0Strategy({
    domain:       process.env.AUTH0_DOMAIN,
    clientID:     process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:  process.env.AUTH0_CALLBACK_URL || 'https://es.libre.university/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    // console.log("Strat", profile);
    return done(null, profile);
  });

passport.use(strategy);

// This can be used to keep a smaller payload
passport.serializeUser(function(user, done) {
  // console.log("Serial", user);
  var locale = user.locale || user._json ? user._json.lang || 'en' : 'en';
  console.log("User:", user);
  var publicUser = {
    _id: user._id,
    id: user.id,
    name: user.displayName,
    username: user._json.nickname,
    email: user._json.email,
    image: user._json.picture_large || user.picture,
    language: locale.split(/[_-]+/)[0] || 'en',
    gender: user.gender
  };
  done(null, publicUser);
});

passport.deserializeUser(function(user, done) {
  // console.log("Unserial", user);
  done(null, user);
});

module.exports = passport;
