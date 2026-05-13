const Project =require("../models/Project.js");
const AuthCode =require("../models/AuthCode.js");
const User =require("../models/User.js");
const RefreshToken=require("../models/RefreshToken.js");

const crypto =require("crypto");
const jwt =require("jsonwebtoken");

const authorize = async (req, res) => {
  try {
    const {
      client_id,
      redirect_uri,
      state,
      response_type
    } = req.query;

    if (response_type !== "code") {
      return res.status(400).json({
        message: "Invalid response_type"
      });
    }

    const project = await Project.findOne({ client_id });

    if (!project) {
      return res.status(400).json({
        message: "Invalid client_id"
      });
    }

    if (!project.redirect_uris.includes(redirect_uri)) {
      return res.status(400).json({
        message: "Invalid redirect_uri"
      });
    }

    const user = await User.findOne();

    const code = crypto.randomBytes(32).toString("hex");

    await AuthCode.create({
      code,
      client_id,
      user_id: user._id,
      redirect_uri,
      expires_at: new Date(Date.now() + 5 * 60 * 1000)
    });

    return res.redirect(
      `${redirect_uri}?code=${code}&state=${state}`
    );
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const token = async (req, res) => {
  try {
    const {
      client_id,
      client_secret,
      code,
      redirect_uri
    } = req.body;

    const project = await Project.findOne({ client_id });

    if (!project) {
      return res.status(400).json({
        message: "Invalid client"
      });
    }

    if (project.client_secret !== client_secret) {
      return res.status(400).json({
        message: "Invalid secret"
      });
    }

    const authCode = await AuthCode.findOne({ code });

    if (!authCode) {
      return res.status(400).json({
        message: "Invalid code"
      });
    }

    if (authCode.used) {
      return res.status(400).json({
        message: "Code already used"
      });
    }

    if (Date.now() > authCode.expires_at.getTime()) {
      return res.status(400).json({
        message: "Code expired"
      });
    }

    if (authCode.redirect_uri !== redirect_uri) {
      return res.status(400).json({
        message: "Redirect URI mismatch"
      });
    }

    authCode.used = true;

    await authCode.save();

    const access_token = jwt.sign(
      {
        user_id: authCode.user_id,
        client_id
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m"
      }
    );

    const refresh_token = crypto
      .randomBytes(32)
      .toString("hex");

    await RefreshToken.create({
      token: refresh_token,
      user_id: authCode.user_id,
      client_id,
      expires_at: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      )
    });

    res.json({
      access_token,
      refresh_token
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


module.exports={token,authorize}