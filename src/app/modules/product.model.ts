import mongoose from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new mongoose.Schema({
    category: {
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    isDeleted:{
        type:Boolean
    }

})

const ProductModel = mongoose.model<TProduct>("Product", productSchema)
export default ProductModel