import admin from "firebase-admin";
import { NextFunction, Request, Response } from "express";
const serviceAccount = require("./config/cert.json");
// const { default: payments } = require('razorpay/dist/types/payments');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  // console.log('Checking auth', req.headers)
  if (req.headers.authtoken) {
    admin
      .auth()
      .verifyIdToken(req.headers.authtoken)
      .then(() => {
        next();
      })
      .catch(() => {
        console.log("Unauthorized");
        res.status(403).send("Unauthorized");
      });
  } else {
    res.status(403).send("Unauthorized");
  }
};
