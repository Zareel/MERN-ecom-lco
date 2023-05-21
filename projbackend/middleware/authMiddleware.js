import User from "../models/userSchema.js";
import JWT from "jsonwebtoken";
import config from "../config/index.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    let token;
    if (
      req.cookies.token ||
      (req.header.authorization &&
        req.header.authorization.startsWith("Bearer"))
    ) {
      token = req.cookies.token || req.header.authorization.split(" ")[1];
      //token = "Bearer ijioj[poijwpdsjijrio"
    }
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Not autherized to this resource",
      });
    }
    const decodedJWTpayload = JWT.verify(token, config.JWT_SECRET);
    req.user = await User.findById(decodedJWTpayload._id, "name email, role");
    next();
  } catch (error) {
    console.log(error);
  }
};

export const isAdmin = async (req, res, next) => {
  console.log("isAdmin is running");
  next();
};
