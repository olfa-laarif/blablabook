import Joi from "joi";

const categoryCreateSchema = Joi.object({
    name: Joi.string().required().min(1),

}).required();

