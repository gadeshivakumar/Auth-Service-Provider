const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true
    },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    client_id: {
      type: String,
      required: true
    },

    expires_at: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

RefreshToken=mongoose.model("RefreshToken", refreshTokenSchema);

module.exports=RefreshToken