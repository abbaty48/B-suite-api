import { QueryResolvers } from '@server-models/@types/resolver_types';
import { ProductController } from '@server-controllers/product.controller';

export const Queries: QueryResolvers = {
  // product
  product: async (_, { searchTerm }) =>
    await ProductController.getProduct(searchTerm),
  // products
  products: async (_, { searchTerm, pagin }) =>
    await ProductController.getProducts(searchTerm, pagin),
};
