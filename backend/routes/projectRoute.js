const express = require("express")
const { createProject, allProjects, singleProject, updateProject, deleteProject } = require("../controllers/projectController")
const { isAuthenticated, isAuthorised } = require("../middleware/auth")
const router = express.Router()

router.post("/add",isAuthenticated,isAuthorised("admin"),createProject)
router.get("/",allProjects)
router.get("/project/:id",singleProject)
router.put("/update/:id",isAuthenticated,isAuthorised("admin"),updateProject)
router.delete("/project/:id",isAuthenticated,isAuthorised("admin"),deleteProject)




module.exports = router