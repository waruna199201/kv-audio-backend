import product  from "../models/product.js";
import { isItAdmin } from "./userController.js";

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
        return
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
            error : "Product registation failed"
        })
    }
}

export async function getProducts(req,res){

    try{
        if(isItAdmin(req)){
            const products = await product.find();
            res.json(products);
            return;
        }else{
            const products = await product.find
            ({avalibility: true});
            res.json(products);
            return;
        }

    }catch(e){
        res.status(500).json({
            message : "Failed to get products"
        })

    }
}

export async function updateProduct(req,res){
    try{
        if(isItAdmin(req)){

            const key = req.params.key;

            const data = req.body

            await product.updateOne({key:key},data)

            res.json({
                message : "Product update successfully"
            })
            return;
        }else{
            res.status(403).json({
                message : "You are not authorized to perform this action"

            })
        }
        
    }catch(e){
        res.status(500).json({
            message : "Failed to update product"
        })
        
    }
}

export async function deleteProduct(req,res) {
    try{
        if(isItAdmin(req)){
            const key = req.params.key;
            await product.deleteOne({key:key})
            res.json({
                message : "Product delete successfully"
            })
        }else{
            res.statos(403).json({
                message : "You are not authorized to perform this action"
            })
            return;
        }

    }catch(e){
        res.status(500).json({
            message : "failed to delete product"
        })
    }
    
}