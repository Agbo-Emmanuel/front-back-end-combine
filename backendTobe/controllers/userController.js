const myModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const validation = require('../validation/validation');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res) =>{
    try{
        const {
            fullName,
          email,
          address,
          state,
          country,
          password,
          DOB,
          phoneNumber
    } = req.body

    
await validation.validateAsync(req.body,(err,data)=>{
    if(err){
        res.json(err.message)
    }else{
        res.json(data)
    }
    })
        const userExists = await myModel.findOne({email})

        if(userExists){
            return res.status(400).json({
                message: `User with email: ${userExists.email} already exists`
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const user = await myModel.create({
            fullName,
            email,
            address,
            state,
            country,
            password: hash,
            DOB,
            phoneNumber
        })
        res.status(201).json({
            message: `Welcome, ${user.fullName}. You have created an account successfully`,
            data: user
        })

    }catch(err){
        res.status(500).json({
            message: err.message 
        })
    }

}

//Create a login function for the user
exports.login = async (req, res) => {
    try {
        const { detail, password } = req.body;

        // Check if the provided detail is an email or phone number
        const user = await myModel.findOne({
            $or: [{ email: detail }, { phoneNumber: detail }]
        });

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        // Check if the provided password is correct
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: 'Invalid password',
            });
        }

        // Create and sign a JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                phoneNumber: user.phoneNumber,
            },
            process.env.secret,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};


