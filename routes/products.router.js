import { Router } from 'express';
import Product from '../models/products.model.js';

// Este modulo solo tiene acceso el administrador (en este caso sin autenticar).
// Se aplican algunas funciones C-R-U-D con los métodos del protocolo HTTP (SOLO FORMATO JSON)
const productsRouter = Router();

// CREATE crea un producto y lo envía al servidor con el método POST.
productsRouter.post("/", async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      await newProduct.save();
      res.status(201).json({ message: "Producto creado", product: newProduct });
    } catch (error) {
      res.status(500).json({ error: "Error al crear el producto", details: error.message });
    }
  });

// READ pide al servidor todos los productos sin renderizar en formato JSON mediante el método GET.
productsRouter.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
  });

// UPDATE actualiza un producto por ID mediante el método PUT.
productsRouter.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
  
      if (!updatedProduct) return res.status(404).json({ error: "Producto no encontrado" });
  
      res.status(200).json({ message: "Producto actualizado", product: updatedProduct });
    } catch (error) {
      res.status(500).json({ error: "ID inválido o error en el servidor", details: error.message });
    }
  });
  
// DELETE: eliminae un producto por ID con el método DELETE.
productsRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) return res.status(404).json({ error: "Producto no encontrado" });

        res.status(200).json({ message: "Producto eliminado", product: deletedProduct });
    } catch (error) {
        res.status(500).json({ error: "ID inválido o error en el servidor", details: error.message });
    }
});

export default productsRouter;