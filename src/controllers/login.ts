import { Request, Response, NextFunction } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

export const postLogin = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("login", (err, user, info) => {
    try {
      if (!user || err) {
        return res.status(401).send("Wrong credentials!");
      }

      req.login(user, { session: false }, (error) => {
        if (error) {
          return res.status(401);
        } else {
          return res.json(
            jwt.sign(
              { user: { id: user.id, email: user.email } },
              process.env.SECRET_TOKEN
            )
          );
        }
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};
