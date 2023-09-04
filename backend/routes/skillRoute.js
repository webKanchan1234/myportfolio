const express = require("express")
const { createSkill, allSkills, getSingleSkill, updateSkill, deleteSkill } = require("../controllers/skillController")
const { isAuthenticated, isAuthorised } = require("../middleware/auth")
const router = express.Router()

router.post("/add-skill",isAuthenticated,isAuthorised("admin"),createSkill)
router.get("/skill/:id",isAuthenticated,isAuthorised("admin"),getSingleSkill)
router.get("/",allSkills)
router.put("/update/:id",isAuthenticated,isAuthorised("admin"),updateSkill)
router.delete("/skill/:id",isAuthenticated,isAuthorised("admin"),deleteSkill)





module.exports=router