import passport from "passport";
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";

import { IOwnUser } from "../interfaces";

const localStrategy = passportLocal.Strategy;
const JWTStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const currentUser: IOwnUser = {
  id: 1,
  email: "test@test.com",
  password: "12345",
};

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email: string, password: string, done) => {
      const user: IOwnUser = currentUser;
      try {
        if (email === "test@test.com" && password === "12345") {
          return done(null, user, { message: "Logged in Successfully" });
        } else {
          return done(null, false, { message: "User not found" });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.SECRET_TOKEN,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
