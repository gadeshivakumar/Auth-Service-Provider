const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware.js");

const {
  createProject,
  getProjects,
  updateProject,
  deleteProject
} = require("../controllers/ProjectController.js");

const router = express.Router();

router.post("/", authMiddleware, createProject);

router.get("/", authMiddleware, getProjects);

router.patch('/:id',authMiddleware,updateProject)

router.delete('/:id',authMiddleware,deleteProject)

module.exports=router