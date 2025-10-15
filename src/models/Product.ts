import { Schema, model, models } from 'mongoose';

const productSchema = new Schema({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  isActive: { type: Boolean, default: true },
  category: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

// Use existing model if in development (HMR), otherwise create new
const Product = models.Product || model('Product', productSchema);
export default Product;