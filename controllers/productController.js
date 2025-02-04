import product  from "../models/product.js";

export async function addProduct(req,res){
    console.log(req.user)

    if(req.user == null){
        res.status(401).json({
            message : "please login and try again"
        })
    return
    }

    if(req.user.role !="admin"){
        res.status(403).json({
            message : "You are not authorized to perform this action"
        })
        return;
    }

    const data = req.body;
    const newProduct = new product(data);
    try{
    await newProduct.save();
    res.json({
        message : "Product registered successfully"
    })
}catch(error){
        res.status(500).json({
            error : "Product addition failed"
        })
    }
}