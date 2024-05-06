import express from "express";
import { getUsers, deleteUserById, updateUserById } from "../models/users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();

    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    return res.json({ deletedUser });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { userName } = req.body;

    if (!userName) {
      return res.sendStatus(400);
    }

    const updatedUser = await updateUserById(id, { userName });

    return res.json({ updatedUser });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
