const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const oauthRoutes = require("./routes/oauthRoutes");
const authMiddleware = require("./middlewares/authMiddleware");

const path = require("path");

dotenv.config();

connectDB();

const app = express();





app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoutes);


app.use("/projects", projectRoutes);

app.use("/oauth", oauthRoutes);

app.use(
  express.static(
    path.join(__dirname, "../client/dist")
  )
);

app.use((req, res) => {
  res.sendFile(
    path.join(__dirname, "../client/dist/index.html")
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});