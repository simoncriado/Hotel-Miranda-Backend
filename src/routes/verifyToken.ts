// const { Router } = require("express");
// const jwt = require("jsonwebtoken");

// const verifyRouter = Router();

// verifyRouter.get("/verify", (req, res) => {
//   const { authToken } = req.header;

//   const verified = jwt.verify(authToken, jwtSecretKey);

//   if (username === "Simon" && password === "12345") {
//     return res.json({
//       token: jwt.sign({ user: "Simon" }, SECRET),
//     });
//   }
//   return res.status(401).json({ message: "Wrong data!" });
// });

// module.exports = verifyRouter;
