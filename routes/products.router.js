import { Router } from 'express';
import Product from '../models/products.model.js';

const productsRouter = Router();
//El siguiente endpoint devuelve todos los productos renderizados con handlebars.
productsRouter.get("/products", async (req,res) =>{
  try {
    const productsList = await Product.find();
    res.status(200).render('products', {productsList});
    console.log(productsList)
  } catch (error) {
      res.status(500).json({ error: "Error al obtener productos" });
  }
})
// El siguiente endpoint devuelve todos los productos sin renderizar
productsRouter.get("/api/products", async (req, res) => {
  try {
      const products = await Product.find();
      res.status(200).json(products);
  } catch (error) {
      res.status(500).json({ error: "Error al obtener productos" });
  }
});

// El siguiente endpoint devuelve los productos por ID
productsRouter.get("/api/products/:id([0-9]+)", (req,res) =>{
  const {id} = req.params
  res
    .status(200)
    .send(`Estás en la ruta de productos "Seleccionados por ID". El ID es: ${id}`)
})

export default productsRouter;