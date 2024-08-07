
const signToken = id => {
    return jwt.sign({ id }, process.env.json_Secret, {
            expiresIn:process.env.Login_Expires
        })
        
}

const user = require("../combineClassModel/combineModel")
const dotenv= require ("dotenv")
const jwt= require ("jsonwebtoken")
exports.signup = async (req, res, next) => {
    try {
        
        const user= await user.create(req.body)
        const token = jwt.sign({ id: user._id },  process.env.json_Secret, {
             expiresIn:process.env.Login_Expires
        }
           
        )

        if (!user) {
            res.status(400).json("unable to signup ")
            
        } else {
            res.status(201).json({
                message: `user ${user.name} has been created successfully`,
                token,
                data:user
            })
        }

    } catch (error) {
        res.status(400).json(error.message)
        next()
    }
}



exports.login = async (req, res, next) => {
   try {
    
       const email = req.body.email;
       const password = req.body.password;
       //object destructuring
       //  const {email, password}= req.body
       if (!email || !password) {
           res.status(400).json({
            message:'error please input your  email and password'
           })
           // check if user exist with the given email
           next()
         
       } else {
           const User = await user.findOne({ email }).select('+password')
           //check if user exist with the given email
        //    if (!User || !(await User (password, User.password)) )=> {
            
        //    }     
             const token = signToken (user._id )
           res.status(200).json({
               status: `logged in successfully`,
               token ,
             User 
           })
       }

   
   
   } catch (error) {
       return next(error)
   }
}
     

   




































// exports.login = async (req, res, next) => {
  
//     try {
        
//         // object destructuring
//         const {email, password,  phoneNumber}= req.body
//         //code to check if user didnt input email or password
//         if (!email || !phoneNumber | (!password)) {
//             res.status(400).json({
//                 message: `error please input your email and phoneNumber`
//             })
//             // code to check if user exist with the given email, password or phoneNuber
//             //   const  user= await user.find(({email, password }))
          

//         } else {
//               const User = await user.findOne({ email}).select('+password')
//             const token = signToken( user._id)
        
//             res.status(200).json({
//                 status: "logged in successfully",
//                 token,
//                 User
//             })
//         }

//     } catch (error) {
//          return next(error)
//     }
// }
