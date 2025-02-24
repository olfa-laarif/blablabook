import Joi from "joi";

export const createMarkSchema = Joi.object({
    rating: Joi.number().integer().min(1).max(5).required(),
    review : Joi.string(),

}).required();