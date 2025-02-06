import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    key : {
        type : String,
        required : true,
        unique : true
    },

    name : {
        type : String,
        required : true
    },

    price : {
        type : Number,
        required : true
    },

    category : {
        type : String,
        required : true,
        default : "uncatagorized"
    },

    dimensions : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    avalibility : {
        type : Boolean,
        required : true,
        default : true
    },
    image : {
        type : [String],
        required : true,
        default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%2Fimages%3Fk%3Dspeakers&psig=AOvVaw0KWb6LC4YH1jsyCiC9DOup&ust=1738912215918000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiZ6_m-rosDFQAAAAAdAAAAABAE"
    },
})

const product = mongoose.model("product",productSchema);

export default product;