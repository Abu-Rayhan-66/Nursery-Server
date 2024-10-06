import { Request, Response } from "express"
import { productService } from "./product.service"

const createProduct = async (req:Request, res:Response)=>{
    try{
        const payload = {
            ...req.body,
            isDeleted:false
        }
        const result = await productService.createProductIntoDb(payload)

        res.status(200).json({
            success:true,
            message:"Product created successfully",
            data:result
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:"something went wrong",
            
        })
    }
}

const getAllProduct = async (req:Request, res:Response)=>{
    try{

 const { searchTerm, minPrice, maxPrice, page = 1, limit = 10, sortBy, sortOrder } = req.query;
  const parsedLimit = Number(limit) || 10; 
  const parsedPage = Number(page) || 1; 
  const skip = (parsedPage - 1) * parsedLimit; 

  

  const priceFilter: Record<string, unknown> = {};
  if (minPrice) priceFilter.$gte = Number(minPrice);
  if (maxPrice) priceFilter.$lte = Number(maxPrice);


  const allProduct = await productService.getProductFromDb({
    searchTerm: searchTerm || "",
    priceFilter: Object.keys(priceFilter).length ? priceFilter : null,
    skip,
    limit:parsedLimit,
    sortBy,
    sortOrder
  });

        res.status(200).json({
            success:true,
            message:"Products retrieve successfully",
            data:allProduct
        })
    } catch(err){
        res.status(500).json({
            success:true,
            message:"something went wrong",
            
        })
    }
}

const getSingleProduct = async (req:Request, res:Response)=>{
    try{
        const {id} = req.params
        const product = await productService.getSingleProductFromDb(id)

        res.status(200).json({
            success:true,
            message:"Products retrieve successfully",
            data:product
        })
    } catch(err){
        res.status(500).json({
            success:true,
            message:"something went wrong",
            
        })
    }
}

const updateProduct = async (req:Request, res:Response)=>{
    try {
        const products = req.body; // Array of products to be updated
        

        // Validate if products array is provided
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide an array of products to update.",
            });
        }

        const updatePromises = products.map(async (product) => {
            const { id, ...updateData } = product; // Destructure to get the product id and update data
            return productService.updateProductIntoDb(id, updateData);
        });

        // Wait for all update operations to complete
        const updatedProducts = await Promise.all(updatePromises);

        res.status(200).json({
            success: true,
            message: "Products updated successfully",
            data: updatedProducts,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}

const updateSingleProduct = async(req:Request, res:Response)=>{
    try{
        const{id} = req.params
        const updateSingleProduct = await productService.updateSingleProductIntoDb(id, req.body)

        res.status(200).json({
            success: true,
            message: "Products updated successfully",
            data: updateSingleProduct,
        });
    }catch(err){
        res.status(500).json({
            success:true,
            message:"something went wrong",
            
            
        })
    }
}

const deleteProduct = async (req:Request, res:Response)=>{
    try{
        const {id} = req.params
        // console.log("from product controller", product, id)
         await productService.deleteProductIntoDb(id)

        res.status(200).json({
            success:true,
            message:"Products deleted successfully",
            data:[]
        })
    }catch(err){
        res.status(500).json({
            success:true,
            message:"something went wrong",
            
            
        })
    }
}





export const productController = {
    createProduct,
    getAllProduct,
    updateProduct,
    updateSingleProduct,
    deleteProduct,
    getSingleProduct
}