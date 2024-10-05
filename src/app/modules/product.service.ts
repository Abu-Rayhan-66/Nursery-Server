import { TProduct } from "./product.interface";
import ProductModel from "./product.model";


const createProductIntoDb = async (payload: TProduct) => {
  const newProduct = await ProductModel.create(payload);
  return newProduct;
};

const getProductFromDb = async (query: Record<string,unknown>)=>{
    const { searchTerm, priceFilter, skip = 0, limit = 10 } = query;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filterConditions: any = {
        isDeleted: false,
      };

    if (searchTerm) {
        filterConditions.$or = [
          { title: { $regex: searchTerm, $options: "i" } },
          { category: { $regex: searchTerm, $options: "i" } },
        ];
      }
    
      if (priceFilter) {
        filterConditions.price = priceFilter;
      }
    
      return await ProductModel.find(filterConditions)
      .skip(Number(skip))   
      .limit(Number(limit))

}
const getSingleProductFromDb = async (id:string)=>{


    const result = await ProductModel.findById(id)
    return result
}
const updateProductIntoDb = async (id:string, payload:TProduct)=>{

  const existingProduct = await ProductModel.findById(id);
  
  if (!existingProduct) {
    throw new Error('Product not found');
  }

  // Calculate the new quantity
  const newQuantity = existingProduct.quantity - payload.quantity;
    const result = await ProductModel.findByIdAndUpdate(id, {quantity:newQuantity},{new:true})
    return result
}
const deleteProductIntoDb = async (id:string)=>{
    const result = await ProductModel.findByIdAndDelete(id)
    return result
}


export const productService = {
    createProductIntoDb,
    getProductFromDb,
    updateProductIntoDb,
    deleteProductIntoDb,
    getSingleProductFromDb
};
