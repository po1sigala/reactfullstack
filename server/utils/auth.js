const jwt= require("jsonwebtoken")
const {GraphQLError}=require("graphql")
const secret="jkhasdlkjhaskdhaskjdh"
const maxAge="24h"
module.exports={
    AuthError:new GraphQLError("failed to authenticate",
      {  extensions:{
            code:"unauthenticated"
        }}
    ),
    authMiddleware:function({req}){
        let token =req.body.token||req.query.token||req.headers.authorization
        if(req.headers.authorization){
            token=token.split(" ").pop().trim()
        }
        if(!token){
            return req
        }
        try{
            const{data}=jwt.verify(token,secret,{maxAge:maxAge})
            req.user=data
        } catch{
            console.log("invalidtoken")
        }
        return req
    },
    createToken:function({username, email, _id}){
        const payload={username, email, _id}
        return jwt.sign({data:payload},secret,{expiresIn:maxAge})
    }
}