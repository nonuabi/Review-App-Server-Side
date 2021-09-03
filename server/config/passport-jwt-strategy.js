// const passport = require("passport");
// const JWTStrategy = require("passport-jwt").Strategy;
// const ExtractJWT = require("passport-jwt").ExtractJwt;
// const dotenv = require("dotenv").config();
// const User = require("../models/users");

// let opts = {
//   jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//   secretOrKey: dotenv.parsed.SECRET_KEY,
// };

// passport.use(
//   new JWTStrategy(opts, function (jwtPayLoad, done) {
//     User.findById(jwtPayLoad._id, function (err, user) {
//       if (err) {
//         console.log(`Error in finding the user from JWT --> ${err}`);
//         return;
//       }
//       if (!user) {
//         return done(null, false);
//       } else {
//         return done(null, user);
//       }
//     });
//   })
// );

// module.exports = passport;
