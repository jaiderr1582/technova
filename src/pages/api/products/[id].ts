import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../lib/db';
import Product from '../../../models/Product';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  switch (req.method) {
    case 'PUT':
      try {
        const updated = await Product.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!updated) return res.status(404).json({ message: 'Product not found' });
        return res.status(200).json(updated);
      } catch (error: any) {
        return res.status(400).json({ message: error.message || 'Update failed' });
      }

    case 'DELETE':
      try {
        const deleted = await Product.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: 'Product not found' });
        return res.status(200).json({ message: 'Product deleted' });
      } catch (error) {
        return res.status(500).json({ message: 'Delete failed' });
      }

    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}