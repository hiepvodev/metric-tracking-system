import bcrypt from "bcrypt";
import { generateJWT } from "../../utils/jwt.js";
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
  const tokenPayload = {
    id: user.id,
    email: user.email,
  }
  const token = generateJWT(tokenPayload);
  return {user, token};
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