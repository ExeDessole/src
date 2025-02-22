import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  products: [
    {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 }
    }
  ]
});

// Permite hacer `populate('products.productId')` para obtener los productos
cartSchema.pre('find', function () {
    this.populate('products.productId');
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
