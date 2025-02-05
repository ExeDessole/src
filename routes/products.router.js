import { Router } from 'express';

const productsRouter = Router();
// El siguiente endpoint devuelve todos los productos
productsRouter.get("/api/products", (req,res) =>{
  res
    .status(200)
    .send('Estás en la ruta de "Lista de productos"')
})


// El siguiente endpoint devuelve los productos por ID
productsRouter.get("/api/products/:id([0-9]+)", (req,res) =>{
  const {id} = req.params
  res
    .status(200)
    .send(`Estás en la ruta de productos "Seleccionados por ID". El ID es: ${id}`)
})

export default productsRouter;