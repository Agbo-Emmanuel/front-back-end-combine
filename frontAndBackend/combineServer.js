const express = require("express")
const mongoose= require("mongoose")

const dotenv = require("dotenv")
const router= require("./combineClassRouter/combineRouter")
const port = 4000
const app= express()
app.use(express.json())

app.use('/api/v1/user', router)

dotenv.config()

const DBLink = process.env.DBLink
mongoose.connect(DBLink).then(() => {
    console.log("connected successfully");
}).catch((err) => {
    console.log(`unable to connect to ${err.message}`);
})

app.listen(port, () => {
    console.log(`server is listening on port :${port}`);
})





// const dotenv = require("dotenv")

// const authRouter= require ("./Router/authRouter.js")

// const port = 5000
// const app = express()
// app.use(express.json())
// //app.use(router)



// app.use('/api/v1/users',authRouter)

// dotenv.config()

// const DBLink = process.env.DBLink
// mongoose.connect(DBLink).then(() => {
//     console.log(`database is connected successfully`)

// }).catch((err) => {
//     console.log(`unable to connect ${err.message}`);
// })

// app.listen(port, () => {
//     console.log(`server is listenin on port: ${port}`);
// })