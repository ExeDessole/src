import { Router } from 'express';
import Product from '../models/products.model.js';

const productsRouter = Router();
//El siguiente endpoint devuelve todos los productos renderizados con handlebars.
productsRouter.get("/products", async (req, res) => {
  try {
    // Obtener la página actual desde los parámetros de la consulta, con un valor predeterminado de 1
    const page = parseInt(req.query.page) || 1;
      
    const sortParam = req.query.sort || 'price_asc';
    let sort = { price: 1 }; 

    // Cambiar el orden dependiendo del valor de sortParam
    if (sortParam === 'price_desc') {
      sort = { price: -1 }; // Ordenar de mayor a menor
    }

    // Obtener los productos paginados
    const productsList = await Product.paginate({}, { limit: 4, page, sort });

    // Mapear los productos para quitar el _id
    const productsListRecupero = productsList.docs.map(product => {
      const { _id, ...rest } = product.toObject();
      return rest;
    });

    // Pasar los datos a la vista
    res.status(200).render('products', {
      productsListRecupero,
      hasPrevPage: productsList.hasPrevPage,
      hasNextPage: productsList.hasNextPage,
      prevPage: productsList.prevPage,
      nextPage: productsList.nextPage,
      currentPage: productsList.page,
      totalPages: productsList.totalPages
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

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