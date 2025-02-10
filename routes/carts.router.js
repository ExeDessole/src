import { Router } from 'express';
import Cart from '../models/carts.model.js';

const cartsRouter = Router();
// C-R-U-D de carrito
// CREATE crea y envia un nuevo carrito al servidor.
cartsRouter.post("/", async (req, res) => {
    try {
        const newCart = new Cart({ products: [] });
        await newCart.save();
        res.status(201).json({ message: "Carrito creado", cart: newCart });
    } catch (error) {
        res.status(500).json({ error: "Error al crear el carrito", details: error.message });
    }
});

// READ pide al servidor que le retorne los carritos existentes
cartsRouter.get("/", async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener carritos" });
    }
});

// READ pide al servidor que le retorne un carrito por ID
cartsRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Cart.findById(id);

        if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el carrito", details: error.message });
    }
});

// UPDATE agrega un producto a un carrito, es decir le envia al servidor un producto para que lo agregue.
cartsRouter.put("/:id/products/:productId", async (req, res) => {
    try {
        const { id, productId } = req.params;
        const { quantity } = req.body;

        const cart = await Cart.findById(id);
        if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

        const existingProduct = cart.products.find(p => p.productId.toString() === productId);
        if (existingProduct) {
            existingProduct.quantity += quantity || 1;
        } else {
            cart.products.push({ productId, quantity: quantity || 1 });
        }

        await cart.save();
        res.status(200).json({ message: "Producto agregado", cart });
    } catch (error) {
        res.status(500).json({ error: "Error al agregar producto al carrito", details: error.message });
    }
});
// DELETE elimina un producto del carrito mediante ID.
cartsRouter.delete("/:id/products/:id", async (req, res) => {
  try {
      const { id } = req.params;
      const deletedCart = await Cart.findByIdAndDelete(id);

      if (!deletedCart) return res.status(404).json({ error: "Carrito no encontrado" });

      res.status(200).json({ message: "Carrito eliminado", cart: deletedCart });
  } catch (error) {
      res.status(500).json({ error: "Error al eliminar carrito", details: error.message });
  }
});

// DELETE elimina un carrito seleccionado mediante ID.
cartsRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCart = await Cart.findByIdAndDelete(id);

        if (!deletedCart) return res.status(404).json({ error: "Carrito no encontrado" });

        res.status(200).json({ message: "Carrito eliminado", cart: deletedCart });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar carrito", details: error.message });
    }
});

export default cartsRouter;
