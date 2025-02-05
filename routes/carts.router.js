import { Router } from 'express';

const cartRouter = Router()
//El siguiente endpoint devuelve el carrito
cartRouter.get("/api/carts", (req,res) =>{
    res
      .status(200)
      .send('Estás en la ruta de carritos')
})

export default cartRouter;