import express from "express";
import Joi from "joi";

import User from "../models/user";
import { signUp } from "../validations/user";
import { parseError, sessionizeUser } from "../utils/helpers";

const userRouter = express.Router();

userRouter.post("", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await Joi.validate({ username, email, password }, signUp);

    const newUser = new User({ username, email, password });
    const sessionUser = sessionizeUser(newUser);
    await newUser.save();

    console.log(req.session);

    req.session.user = sessionUser;
    res.send(sessionUser);
  } catch (error) {
    res.status(400).send(parseError(error));
  }
});

export default userRouter;
