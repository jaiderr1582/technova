import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../lib/db';
import Product from '../../../models/Product';

// Next.js API route handler for managing a single product by ID (PUT and DELETE)
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Ensure database connection is established before processing the request
  await connectDB();
  const { id } = req.query;

  // Validate that the provided ID is a non-empty string (required for MongoDB)
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  switch (req.method) {
    case 'PUT':
      try {
        // Update product with new data and return the updated document
        const updated = await Product.findByIdAndUpdate(id, req.body, {
          new: true,           // Return updated document instead of original
          runValidators: true, // Enforce schema validation on update
        });
        if (!updated) return res.status(404).json({ message: 'Product not found' });
        return res.status(200).json(updated);
      } catch (error: any) {
        // Return validation or update errors to the client
        return res.status(400).json({ message: error.message || 'Update failed' });
      }

    case 'DELETE':
      try {
        // Permanently remove the product from the database
        const deleted = await Product.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: 'Product not found' });
        return res.status(200).json({ message: 'Product deleted' });
      } catch (error) {
        // Handle unexpected errors during deletion (e.g., DB connection issues)
        return res.status(500).json({ message: 'Delete failed' });
      }

    default:
      // Respond with 405 Method Not Allowed for unsupported HTTP methods
      res.setHeader('Allow', ['PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}