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

export const autherize =
  (...requiredRoles) =>
  async (req, res, next) => {
    try {
      if (!requiredRoles.includes(req.user.role)) {
        res.send(error, "You are not autherized to access this resource");
      }
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Error in autherize",
      });
    }
  };

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== config.ADMIN) {
      return res.status(401).json({
        success: false,
        message: "Unautherized access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Error in admin middleware",
    });
  }
};
