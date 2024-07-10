const {Schema, model}=require("mongoose")
const bookSchema=require("./Book")
const bcrypt= require ("bcrypt")
const userSchema= new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            match:[/.+@.+\..+/, "please use valid email format"]
        },
        password:{
            type:String,
            required:true
        },
        favBooks:[bookSchema]
    }
)
userSchema.pre("save", async function(next){
    if(this.isNew||this.isModified("password")){
        const salt=10;
        this.password=await bcrypt.hash(this.password, salt)

    }
    next()
})
userSchema.methods.isPassCorrect= async function(pass){
    return bcrypt.compare(pass, this.password)
} 
const User=model("User",userSchema)

module.exports=User