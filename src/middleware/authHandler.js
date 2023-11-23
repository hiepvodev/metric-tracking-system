import { verifyJWT } from "../utils/jwt.js";
import Unauthenticated from "../errors/unauthenticated.js";
import userService from "../services/users/user.services.js";

const authHandler = async (req, res, next) => {
    // Check if Authorization header is present
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Unauthenticated("No token provided");
    }
    // Extract token from Authorization header
    const token = authHeader.split(" ")[1];
    // Verify token
    const { data } = verifyJWT(token);
    // Check if user exists
    const user = await userService.findByEmail(data.email);
    if (!user) {
        throw new Unauthenticated("User not found");
    }
    // Attach user to request object
    req.user = user;
    next();
};

export default authHandler;