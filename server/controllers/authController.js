import { StatusCodes } from "http-status-codes";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/userModel.js";
import Track from "../models/trackModel.js";
import resetPasswordEmail from "../emails/resetPasswordEmail.js";
import inviteEmail from "../emails/inviteEmail.js";
import welcomeEmail from "../emails/welcomeEmail.js";

// endpoint for creating a user(admin)
const createAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(StatusCodes.CONFLICT).json({
        msg: "User already exists",
      });
    }

    const newUser = new User({
      name,
      email,
      password,
      role,
    });

    await newUser.save();

    res.status(StatusCodes.CREATED).json({
      msg: "Admin created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Internal server error",
    });
  }
};

// endpoint for admins to invite students to the platform
const inviteUser = async (req, res) => {
  try {
    const { email, role, trackId } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(StatusCodes.CONFLICT).json({
        msg: "User already exists",
      });
    }

    // generate invite link and expiry time
    const inviteToken = crypto.randomBytes(32).toString("hex");
    const inviteTokenExpires = Date.now() + 24 * 7 * 60 * 60 * 1000; // 7 days

    // create user
    const user = new User({
      email,
      role,
      track: trackId,
      inviteToken,
      inviteTokenExpires,
      isActive: false, // set the activity status as false
    });

    await user.save();

    // set students field on track schema
    const track = await Track.findById(trackId);
    if (!track) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "Track not found",
      });
    }

    track.students.push(user._id);
    await track.save();

    // invite email
    const inviteUrl = `https://intertechub-task-management-app.netlify.app/auth/setup-account/${inviteToken}`;

    // ?trackId=${trackId}

    await inviteEmail(user.email, inviteUrl);

    res.status(StatusCodes.CREATED).json({
      msg: "Invitation sent",
    });
  } catch (error) {
    console.error("Error inviting user", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

// endpoint for students to set up their account
const setupAccount = async (req, res) => {
  try {
    const { inviteToken } = req.params;
    const { password, name } = req.body;

    const user = await User.findOne({
      inviteToken,
      inviteTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Invalid or expired invite token",
      });
    }
    user.password = password;
    user.name = name;
    user.isActive = true; // activate user
    user.inviteToken = undefined;
    user.inviteTokenExpires = undefined;

    await user.save();

    await welcomeEmail(user.email, name);

    res.status(StatusCodes.OK).json({
      msg: "Account has been setup successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        track: user.track,
      },
    });
  } catch (error) {
    console.error("Error occurred", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let findUser = await User.findOne({ email });

    if (!findUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Email not found",
      });
    }

    const isMatch = await bcryptjs.compare(password, findUser.password);
    if (!isMatch) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Incorrect password",
      });
    }

    const token = jwt.sign(
      {
        userId: findUser._id,
        role: findUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(StatusCodes.OK).json({
      msg: "Login successful",
      token: token,
      user: {
        userId: findUser._id,
        name: findUser.name,
        email: findUser.email,
        role: findUser.role,
      },
    });
  } catch (error) {
    console.error("Error occurred", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Internal server error",
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // generate token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // hash reset token and set expiry time
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;

    await user.save();

    // reset URL
    const resetUrl = `https://intertechub-task-management-app.netlify.app/auth/reset-password/${resetToken}`;

    // reset password email
    await resetPasswordEmail(user.email, resetUrl);

    res.status(StatusCodes.OK).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { resetToken } = req.params;
    // console.log("reset token", resetToken);

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
      return res.status(400).json({ message: "Password is not provided" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res
      .status(StatusCodes.OK)
      .json({ message: "Password successfully updated" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

// login logic with invite token included
// const login = async (req, res) => {
//   try {
//     const { inviteToken } = req.params;
//     const { email, password, name } = req.body;

//     let findUser = await User.findOne({ email });

//     if (!findUser) {
//       return res.status(StatusCodes.BAD_REQUEST).json({
//         msg: "Email not found",
//       });
//     }

//     if (findUser.role === "admin") {
//       const isMatch = await bcryptjs.compare(password, findUser.password);
//       if (!isMatch) {
//         return res.status(StatusCodes.BAD_REQUEST).json({
//           msg: "Incorrect password",
//         });
//       }

//       const token = jwt.sign(
//         {
//           userId: findUser._id,
//           role: findUser.role,
//         },
//         process.env.JWT_SECRET,
//         { expiresIn: "1h" }
//       );

//       return res.status(StatusCodes.OK).json({
//         msg: "Login successful",
//         token: token,
//         user: {
//           userId: findUser._id,
//           username: findUser.username,
//           email: findUser.email,
//           role: findUser.role,
//         },
//       });
//     }

//     // first time student account set up
//     if (findUser.role === "student" && findUser.inviteToken) {
//       if (
//         !inviteToken ||
//         findUser.inviteToken !== inviteToken ||
//         findUser.inviteTokenExpires <= Date.now()
//       ) {
//         return res.status(StatusCodes.BAD_REQUEST).json({
//           msg: "Invalid or expired invite token",
//         });
//       }

//       if (!findUser.username) {
//         findUser.username = email.split("@")[0];
//       }
//       findUser.password = password;
//       findUser.name = name;
//       findUser.isActive = true;
//       findUser.inviteToken = undefined;
//       findUser.inviteTokenExpires = undefined;

//       await findUser.save();

//       const token = jwt.sign(
//         {
//           userId: findUser._id,
//           role: findUser.role,
//         },
//         process.env.JWT_SECRET,
//         { expiresIn: "1h" }
//       );

//       return res.status(StatusCodes.OK).json({
//         msg: "Account setup successfully and logged in",
//         token: token,
//         user: {
//           userId: findUser._id,
//           username: findUser.username,
//           email: findUser.email,
//           role: findUser.role,
//         },
//       });
//     }

//     // standard student login
//     if (findUser.role === "student") {
//       const isMatch = await bcryptjs.compare(password, findUser.password);
//       if (!isMatch) {
//         return res.status(StatusCodes.BAD_REQUEST).json({
//           msg: "Incorrect password",
//         });
//       }

//       const token = jwt.sign(
//         {
//           userId: findUser._id,
//           role: findUser.role,
//         },
//         process.env.JWT_SECRET,
//         { expiresIn: "1h" }
//       );

//       return res.status(StatusCodes.OK).json({
//         msg: "Login successful",
//         token: token,
//         user: {
//           userId: findUser._id,
//           username: findUser.username,
//           email: findUser.email,
//           role: findUser.role,
//         },
//       });
//     }

//     return res.status(StatusCodes.FORBIDDEN).json({
//       msg: "Unauthorized access",
//     });
//   } catch (error) {
//     console.error("Error occurred", error);
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       msg: "Internal server error",
//     });
//   }
// };

export {
  createAdmin,
  inviteUser,
  setupAccount,
  login,
  forgotPassword,
  resetPassword,
};
