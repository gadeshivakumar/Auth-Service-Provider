const mongoose = require("mongoose");

const authCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true
    },

    client_id: {
      type: String,
      required: true
    },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    redirect_uri: {
      type: String,
      required: true
    },

    expires_at: {
      type: Date,
      required: true
    },

    used: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);


AuthCode=mongoose.model("AuthCode", authCodeSchema); 

module.exports=AuthCode