import Joi from "joi";

export const userCreateShema = Joi.object({
    username : Joi.string().required().min(1),
    firstname : Joi.string().required().min(1),
    lastname : Joi.string().required().min(1),
    email : Joi.string().email().required(),
    password : Joi.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/),
    // Ici le mot de passe verifie la présence d'au moins 1 majuscule,  au moins 1 minuscule, au moins 1 chiffre, 
    // au moins un charactère spécial et au moins un chiffre eoins 8 charactère de long.
    biography : Joi.string(),
}).required();