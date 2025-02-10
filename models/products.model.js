import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: String,
    stock: Number
});

productSchema.plugin(mongoosePaginate);
const Product = mongoose.model('Product', productSchema);

export default Product;
