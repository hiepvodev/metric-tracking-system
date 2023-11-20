import bcrypt from "bcrypt";
import userServices from "../users/user.services.js";
import NotFound from "../../errors/notFound.js";
import BadRequest from "../../errors/badRequest.js";

const login = async (email, password) => {
  const user = await userServices.findByEmail(email);
  if (!user) {
    throw new NotFound("User not found", );
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new BadRequest("Incorrect password");
  }
  return user;
};

const register = async (email, password) => {
  const user = await userServices.findByEmail(email);
  if (user) {
    throw new BadRequest("User already exists");
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