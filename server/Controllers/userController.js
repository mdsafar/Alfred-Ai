import asyncHandler from "express-async-handler";
import { sendToken } from "../utils/jwtToken.js";
import passport from "passport";

export const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleCallback = passport.authenticate("google", {
  successRedirect: "https://alfred-ai-uyj1.onrender.com/",
  failureRedirect: "https://alfred-ai-uyj1.onrender.com/",
});

export const loginSuccess = async (req, res) => {
  try {
    const user = req.user;

    if (user) {
      sendToken(user, 200, res);
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      err,
    });
  }
};

export const logout = asyncHandler(async (req, res) => {
  req.logOut(() => {});

  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
