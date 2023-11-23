import jwt from "jsonwebtoken";
import Unauthenticated from "../errors/unauthenticated.js";

const generateJWT = (payload, secret = process.env.JWT_SECRET, expiresIn = process.env.JWT_EXPIRES_IN) => {
    return jwt.sign(
      {
        data: payload,
      },
      secret,
      { expiresIn }
    );
  };
  
const verifyJWT = (token, secret = process.env.JWT_SECRET) => {
    const data = jwt.verify(token, secret, (err, data) => {
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