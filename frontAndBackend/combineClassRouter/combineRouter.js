const express= require("express")
const combineclassCon = require("../combineCon/combineclassCon")
const router= express.Router()
router.route("/signup").post(combineclassCon.signup)
router.route("/login").post(combineclassCon.login)
module.exports = router

// https://localhost:4000/api/v1/user/signup


// https://localhost:4000/api/v1/user/login
