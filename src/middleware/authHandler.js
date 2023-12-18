import { verifyJWT, generateJWT } from "../utils/jwt.js";
import Unauthenticated from "../errors/unauthenticated.js";
import userService from "../services/users/user.services.js";
import postService from "../services/posts/post.services.js";

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

const refreshTokenHandler = async (refreshToken) => {
    // Verify refresh token
    const { data } = verifyJWT(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    // Check if user exists and if refresh token is valid
    const user = await userService.findByEmail(data.email);
    if (!user || user.refreshToken !== refreshToken) {
        throw new Unauthenticated("Invalid refresh token");
    }
    // Generate new tokens
    const newAccessToken = generateJWT({ id: user.id, email: user.email }, process.env.JWT_SECRET, "15m");
    const newRefreshToken = generateJWT({ id: user.id, email: user.email }, process.env.REFRESH_TOKEN_SECRET, "7d");
    // Update refresh token in database
    await userService.updateById(user.id, { refreshToken: newRefreshToken });
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

const verifyRoles = roles => async (req, res, next) => {
    // Check if user has any of the specified roles
    if (!roles.some(role => req.user.role.includes(role))) {
        throw new Unauthenticated("Unauthorized");
    }
    next();
};

const verifyResourceOwnerOrAdmin = async (req, res, next) => {
    const existingPost = await postService.getByPostId(req.params.id);
    const tokenisedUser = req.user;
    // Check if user is trying to update their own post or if they are not an admin
    if (existingPost.authorId !== tokenisedUser.id && !tokenisedUser.role.includes("ADMIN")) {
        throw new Unauthenticated("Permission Denied");
    }
    next();
}

export { authHandler, refreshTokenHandler, verifyRoles, verifyResourceOwnerOrAdmin };