const User = require("../models/User.js");
const bcrypt=require("bcryptjs");
const jwt =require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, next } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials"
      });
    }

    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // if oauth flow exists
    if (next) {
      return res.status(200).json({
        message: "Login successful",
        redirect: `http://localhost:5000${next}`
      });
    }

    
    return res.status(200).json({
      message: "Login successful"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const logout = async (req, res) => {

  res.clearCookie("token");

  res.json({
    message: "Logged out"
  });

};

module.exports={login,signup,logout}