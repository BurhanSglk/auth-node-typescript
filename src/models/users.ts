import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  authentication: {
    password: {
      type: String,
      required: true,
      select: false,
    },
    salt: {
      type: String,
      select: false,
    },
    sessionToken: {
      type: String,
      select: false,
    },
  },
});

const User = mongoose.model("User", userSchema);

export const getUsers = () => User.find({});

export const getUserByMail = (mail: string) => User.findOne({ email: mail });

export const getUserBySessionToken = (sessionToken: string) =>
  User.findOne({ "authentication.sessionToken": sessionToken });

export const getUserById = (id: string) => User.findById(id);

export const createUser = (values: Record<string, any>) =>
  new User(values).save().then((user) => user.toObject());

export const deleteUserById = (id: string) =>
  User.findByIdAndDelete({ _id: id });

export const updateUserById = (id: string, values: Record<string, any>) =>
  User.findByIdAndUpdate({ _id: id }, { $set: values });

export default User;
