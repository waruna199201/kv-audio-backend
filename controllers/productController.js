import product  from "../models/product.js";

export function addProduct(req,res){
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
    }
    const data = req.body;
    const newProduct = new product(data);
    newProduct.save()
    .then(()=>{
        res.json({message : "Product added successfully"});
    })
    .catch((error)=>{
        res.status(500).json({error : "Product addition failed"});
    });
}