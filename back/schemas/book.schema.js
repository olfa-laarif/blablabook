import Joi from "joi";

export const bookCreateSchema = Joi.object({
    title : Joi.string().required().min(1),
    summary : Joi.string().required().min(1),
    published_date : Joi.string().required(),
    image: Joi.string().required(),
    status: Joi.string().required(),
    availability : Joi.boolean().required()
    
}).required();