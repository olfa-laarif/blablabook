import Joi from "joi";

export const authorCreateSchema = Joi.object({
    firstname:Joi.string().required().min(1),
    lastname : Joi.string().required().min(1),
    biography : Joi.string().required().min(1),

}).required();