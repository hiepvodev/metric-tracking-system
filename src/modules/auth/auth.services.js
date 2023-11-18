import bcrypt from "bcrypt";
import userServices from "../users/user.services.js";

const login = async (email, password) => {
  const user = await userServices.findByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Incorrect password");
  }
  return user;
};

const register = async (email, password) => {
  const user = await userServices.findByEmail(email);
  if (user) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userServices.create({
      email,
      password: hashedPassword,
    });
  return newUser;
};

export default {
  login,
  register,
};