const express = require("express")
const { createUser, getUser, getUsers, updateUser, deleteUser, signIn, logoutUser, forgetPassword, updatePassword, getUserDetails } = require("../controllers/userController")
const { isAuthenticated, isAuthorised} = require("../middleware/auth")
const router = express.Router()


router.post("/create",createUser)
router.get("/user/:id",isAuthenticated,isAuthorised("admin"), getUser)
router.get("/",isAuthenticated,getUsers)
router.put("/update/:id",isAuthenticated,updateUser)
router.delete("/delete/:id",isAuthenticated,deleteUser)
router.post("/signin",signIn)
router.get("/me",isAuthenticated,getUserDetails)
router.get("/logout",logoutUser)
router.post("/password/forget",forgetPassword)
router.put("/update-password",isAuthenticated,updatePassword)






module.exports = router