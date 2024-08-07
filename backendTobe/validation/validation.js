const joi = require('joi');

const validation  =  joi.object({
    fullName: joi.string()
            .min(3)
            .required(),

    
    email: joi.string()
            .email(),

    address: joi.string()
            .min(3)
            .required(),

    state: joi.string()
            .min(3)
            .required(),

    country: joi.string()
            .required(),

    DOB: joi.string()
            .required(),

    password: joi.string()
            .pattern(new RegExp ('^[a-zA-Z0-9]{8,}$')),

    phoneNumber: joi.string()
            .pattern(new RegExp ('^[0-9]'))
            .min(11)
            .max(11),
})

module.exports = validation