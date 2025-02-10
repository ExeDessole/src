import { Router } from 'express';
import Product from '../models/products.model.js';
import Cart from '../models/carts.model.js';

// Se aplican algunas funciones C-R-U-D con los métodos del protocolo HTTP (SOLO LAS RENDERIZADAS)
const viewsRouter = Router();

// FUNCIONES PARA PRODUCTOS
//READ pide al servidor todos los productos renderizados con handlebars mediante el método GET.
viewsRouter.get("/products", async (req, res) => {
  try {
    // Inicio en pág. 1 por default
    const page = parseInt(req.query.page) || 1;
    
    //Orden por default asc  
    const sortParam = req.query.sort || 'price_asc';
    let sort = { price: 1 }; 

    // Cambiar el orden dependiendo del valor de sortParam
    if (sortParam === 'price_desc') {
      sort = { price: -1 };
    }

    // Productos paginados
    const productsList = await Product.paginate({}, { limit: 4, page, sort, lean: true });

    // Pasar los datos a la vista
    res.status(200).render('products', {
      productsList: productsList.docs, 
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

// READ pide al servidor un producto por ID renderizados con handlebars mediante el método GET.
viewsRouter.get("/products/:id([a-fA-F0-9]{24})", async (req, res) => {
  try {
    const { id } = req.params;
    const singleProduct = await Product.findById(id).lean();

    if (!singleProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).render("singleProduct", { singleProduct });
  } catch (error) {
    res.status(500).json({ error: "ID incorrecto o error del servidor" });
  }
});
//------------------------------------------------------------------
// FUNCIONES PARA CARRITOS

// Renderizar todos los carritos
viewsRouter.get("/carts", async (req, res) => {
    try {
        const carts = await Cart.find().lean();
        res.render('carts', { carts });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener carritos" });
    }
});

// Renderizar un carrito por ID
viewsRouter.get("/carts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Cart.findById(id).lean();

        if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

        res.render('singleCart', { cart });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener carrito" });
    }
});

export default viewsRouter;