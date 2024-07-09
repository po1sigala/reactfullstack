const express = require ("express")
const path  = require("path")
const {ApolloServer}=require("@apollo/server")
const {expressMiddleware}=require("@apollo/server/express4")
const {typeDefs, resolvers}=require("./schemas")
const PORT=process.env.PORT||3001
const db=require("./config")
const server= new ApolloServer({
    typeDefs,
    resolvers
})
const app=express()

const startApollo= async ()=>{
    await server.start()
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use("/graphql",expressMiddleware(server,{
        context:authMiddleware
    }))
    if(process.env.NODE_ENV=="production"){
        app.use(express.static(path.join(__dirname, '../client/dist')));
        app.get('*', (req, res) => {
          res.sendFile(path.join(__dirname, '../client/dist/index.html')); })  
        }

    db.once("open",()=>{
        app.listen(PORT,()=>{
            console.log("running on ",PORT)
        })
    })
    
}
startApollo()