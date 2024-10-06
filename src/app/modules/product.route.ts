import { Router } from "express"
import { productController } from "./product.controller"

const productRoute = Router()

productRoute.post('/product', productController.createProduct)
productRoute.get('/product', productController.getAllProduct )
productRoute.patch('/product/updateMultiple', productController.updateProduct)
productRoute.patch('/product/:id', productController.updateSingleProduct)
productRoute.delete('/product/:id', productController.deleteProduct)
productRoute.get('/product/:id', productController.getSingleProduct)

export default productRoute