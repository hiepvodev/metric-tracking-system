import jwt from "jsonwebtoken";
import Unauthenticated from "../errors/unauthenticated.js";

const generateJWT = (payload) => {
  return jwt.sign(
    {
      data: payload,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

const verifyJWT = (token) => {
    const data = jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            throw new Unauthenticated("Invalid token");
        }
        return data;
    });
    if (!data) {
        throw new Unauthenticated("Invalid token");
    }
    return data;
};

export { generateJWT, verifyJWT };