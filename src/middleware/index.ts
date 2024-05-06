import express from "express";

import { get, identity, merge } from "lodash";

import { getUserBySessionToken } from "../models/users";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = get(req, "cookies.AUTH_SESSION");

    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const existUser = await getUserBySessionToken(sessionToken);

    if (!existUser) {
      return res.sendStatus(403);
    }

    merge(req, { identity: existUser });

    return next();
  } catch (error) {
    console.log(error);
    res.status(401);
  }
};

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;

    const currentUser = get(req, "identity._id") as string;

    if (id !== currentUser) {
      return res.sendStatus(403);
    }

    if (currentUser.toString() !== id) return res.sendStatus(403);

    next();
  } catch (error) {
    console.log(error);
    res.status(401);
  }
};
