import bcrypt from "bcrypt";
import { generateJWT } from "../../utils/jwt.js";
import userServices from "../users/user.services.js";
import NotFound from "../../errors/notFound.js";
import BadRequest from "../../errors/badRequest.js";

const login = async (email, password) => {
  // Check if user exists
  const user = await userServices.findByEmail(email);
  if (!user) {
    throw new NotFound("User not found", );
  }
  // Check if password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new BadRequest("Incorrect password");
  }
  // Generate tokens
  const tokenPayload = {
    id: user.id,
    email: user.email,
  }
  const token = generateJWT(tokenPayload, process.env.JWT_SECRET, "15m");
  const refreshToken = generateJWT(tokenPayload, process.env.REFRESH_TOKEN_SECRET, "7d");
  // Update refresh token in database
  await userServices.updateById(user.id, { refreshToken });
  return {user, token, refreshToken};
};

const register = async (email, password) => {
  // Check if user exists
  const user = await userServices.findByEmail(email);
  if (user) {
    throw new BadRequest("User already exists");
  }
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create new user
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