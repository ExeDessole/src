import { Router } from 'express';

const viewsRouter = Router();

//El siguiente endpoint devuelve el carrito
viewsRouter.get("/api/views", (req,res) =>{
  res.status(200).render('index');
})
export default viewsRouter;