import {User} from "../models/associations.js";


export const userController ={

  async getUserByEmail(req, res) {
    try {

        const email = decodeURIComponent(req.params.email); // Décoder l'email
        
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found!' });
        }

        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
},


  async getUserByUsername(req, res){
    console.log(req.params.username);
    const user = await User.findOne({ where: { username:req.params.username } });
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
  }
}
