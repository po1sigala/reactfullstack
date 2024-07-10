const {User}=require("../models")
const {AuthError,createToken}=require("../utils/auth")
const resolvers={
    Query:{
        me:async (parent,args,context)=>{
            if(context.user){
                const userData= await  User.findOne({_id:context.user._id})
                return userData
            }else{throw AuthError}
        }
    },
    Mutation:{
        login: async (parent,{email, password})=>{
            const user = await User.findOne({email})
            if(!user){
                throw AuthError
            }
            const didPassMatch=user.isPassCorrect(password)
            if(!didPassMatch){
                throw AuthError
            }
            const token =createToken(user)
            return{token, user}
        },
        addUser: async(parent, args)=>{
       
            const user = await User.create(args)
            const token= createToken(user)
            return({token, user})
        }

    }
}
module.exports=resolvers