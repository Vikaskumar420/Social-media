import User from '../models/User.model.js'

export const getCurrentUser = async(req , res)=>{
    try {
        const userId = req.userId;
        console.log(userId);
        
        const user = await User.findById({_id:userId})

        
        

        if(!user){
            return res.status(400).json({
                message:"user not found"
            })
        }  

        
        res.status(200).json({
            message:"this is current user!",
            user
        })     
    } catch (error) {
        return res.status(500).json({
            message:`getCurrent user error: ${error}`
        })
    }
}