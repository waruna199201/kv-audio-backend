import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose"; 
import studentRouter from "./routes/studentRoute.js";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt from "jsonwebtoken";

let app = express();

app.use(bodyparser.json ());

app.use((req,res,next)=>{
    
    let token = req.header
    ("Authorization");

    if(token != null) {
        token = token.replace("Bearer ","");
        
        jwt.verify(token, "kv-secret-89!", 
            (err, decoded) => {
                
                if(!err){
                    req.user = decoded;
                }
            });
    }
    next()
    });



let mongoUrl = "mongodb+srv://admin:123@cluster0.67jqx.mongodb.net/prods?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl)

let connection = mongoose.connection
connection.once("open",()=>{
    console.log("MongoDB connection established successfully")
})


app.use("/api/users",userRouter)
app.use("/api/products",productRouter)

app.listen(3000,() => {
    console.log("Server is running on port 3000")
});