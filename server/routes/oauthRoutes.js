const express = require("express")

const {
  authorize,
  token
} = require("../controllers/oauthController.js");

const oauthMiddleware=require('../middlewares/oauthMiddleware.js');
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/authorize",oauthMiddleware, authorize);

router.post("/token",oauthMiddleware, token);

module.exports= router;