const mongoose= require("mongoose")

const bcrypt= require("bcrypt")
const validator= require("validator")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
      
    },
       email: {
        type: String,
           required: [true, "please input your email"],
         unique: true,
         lowercase: true,
       validate:[validator.isEmail,"please enter your email"]
    } ,
        address: {
        type: String,
       required:[true,"please input your address"]
    } ,
         state: {
        type: String,
       required:[true,"please input your state"]
    },
          country: {
        type: String,
       required:[true,"please input your country"]
    } ,
        password: {
        type: String,
            required: [true, "please input your password"],
          minlength:8
    },
         comfirmpassword: {
        type: String,
            required: [true, "please input your comfirmpassword"],
             minlength: 8,
          validate: {
              // code for validating the comfirm password
              validator: function (val) {
                  return val == this.password
              },
               message:"password and confirm password does not match"
          }
      },
        
    dateofbirth: {
        type: String,
       required:[true,"please input your dateofbirth"]
    }, 
          
    phoneNumber: {
        type: String,
       required:[true,"please input your dateofbirth"]
    } 
     
})
userSchema.pre('save', async function (next) {
    // check if user didnt change their password
    if (this. isModified('password')) return next()
    
    // code for encrypting of password
    this.password = await bcrypt.hash(this.password, 12)
    
    // code for not saving the comfirm password in the database after inputing
    next()
})

const user= mongoose.model("user", userSchema)
module.exports= user


   