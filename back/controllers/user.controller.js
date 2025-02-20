import {User,Book} from "../models/associations.js";
import { sequelize } from "../models/sequelizeClient.js";

export const userController ={

  async getUserByEmail(req, res) {
    try {

        const email=req.params.email;
        const user =await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found!' });
        }

        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
},


  async getUserByUsername(req, res){
    const username=req.params.username;
    const user = await User.findOne({ where: { username } });
    if(!user){
      res.status(404).json({error:'User not found !'});
    }
    res.json(user);
  },
 

  async getOneUser(req, res){
    const user = await User.findByPk(req.params.id);
  
  
    if(!user){
      res.status(404).json({error:'User not found !'});
    }
    res.json(user);
  },

  async  getAllUsers(req, res){
    const users = await User.findAll(
    { 
      include : [
      { model : Book}
      ]}).catch((error) => {
        console.log(error);
      } );
      res.json(users);
    },
}
