import express from "express";

import { createUser, getUserByMail } from "../models/users";
import { random, authentication } from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByMail(email).select(
      "+authentication.salt +authentication.password"
    );

    const expextedHash = authentication(user.authentication.salt, password);

    if (expextedHash !== user.authentication.password) {
      return res.sendStatus(403);
    }

    const salt = random();

    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie("AUTH_SESSION", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(user);
  } catch (error) {}
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, userName } = req.body;

    if (!email || !password || !userName) {
      return res.sendStatus(400);
    }

    const existUser = await getUserByMail(email);

    console.log(existUser);

    if (existUser) {
      return res.sendStatus(400);
    }

    const salt = random();

    const user = await createUser({
      email,
      userName,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.sendStatus(400);
  }
};
