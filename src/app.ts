import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import productRoute from './app/modules/product.route'
const app: Application = express()

// parser
app.use(express.json())
app.use(cors())

app.use('/api', productRoute)
// app.use('/api/orders', OrdersRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})



export default app