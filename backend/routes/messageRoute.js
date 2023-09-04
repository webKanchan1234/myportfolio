const express = require("express")
const { isAuthenticated, isAuthorised } = require("../middleware/auth")
const { createMessage, getSingleMessage, allmesssage, updateMessage, deleteMessage } = require("../controllers/messageController")
const router = express.Router()

router.post("/add-message",createMessage)
router.get("/message/:id",isAuthenticated,isAuthorised("admin"),getSingleMessage)
router.get("/",isAuthenticated,isAuthorised("admin"),allmesssage)
router.put("/update/:id",isAuthenticated,isAuthorised("admin"),updateMessage)
router.delete("/message/:id",isAuthenticated,isAuthorised("admin"),deleteMessage)





module.exports=router