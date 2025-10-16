import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../lib/db';
import Product from '../../../models/Product';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        // Support optional filtering by category and brand via query parameters
        const { category, brand } = req.query;
        let filter: any = {};
        if (category) filter.category = category;
        if (brand) filter.brand = brand;

        const products = await Product.find(filter).sort({ createdAt: -1 });
        return res.status(200).json(products);
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching products' });
      }

    case 'POST':
      try {
        // Enforce SKU uniqueness to prevent duplicate products
        const existing = await Product.findOne({ sku: req.body.sku });
        if (existing) {
          return res.status(400).json({ message: 'SKU must be unique' });
        }

        const product = await Product.create(req.body);
        return res.status(201).json(product);
      } catch (error: any) {
        return res.status(400).json({ message: error.message || 'Invalid data' });
      }

    default:
      // Return 405 Method Not Allowed for unsupported HTTP methods
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}