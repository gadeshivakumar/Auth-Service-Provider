const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    client_id: {
      type: String,
      required: true,
      unique: true
    },

    client_secret: {
      type: String,
      required: true
    },

    redirect_uris: [
      {
        type: String
      }
    ],

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

Project= mongoose.model("Project", projectSchema);

module.exports=Project