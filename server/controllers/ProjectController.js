const Project = require( "../models/Project.js");
const crypto = require("crypto");

const createProject = async (req, res) => {
  try {
    const { name, redirect_uris } = req.body;

    const client_id = crypto.randomBytes(16).toString("hex");

    const client_secret = crypto.randomBytes(32).toString("hex");

    const project = await Project.create({
      name,
      client_id,
      client_secret,
      redirect_uris,
      owner: req.user.id
    });

    res.json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      owner: req.user.id
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { redirect_uris } = req.body;
    console.log(id);
    if (!id) {
      return res.status(400).json({
        message: "Bad request",
      });
    }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }

    project.redirect_uris = redirect_uris;

    await project.save();

    return res.status(200).json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports={getProjects,createProject,updateProject,deleteProject}