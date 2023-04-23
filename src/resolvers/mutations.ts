import { MutationResolvers } from '@server-models/@types/resolver_types';
import { ProductController } from '@server-controllers/product.controller';

const ProductMutations: MutationResolvers = {
  // productAdd
  productAdd: async (_, { productAddInput }, context) =>
    await ProductController.addProduct(productAddInput, context),
  // productEdit
  productEdit: async (_, { productEditInput }, context) =>
    await ProductController.editProduct(productEditInput, context),
  // productDelete
  productDelete: async (_, { productID, warehouseID }, context) =>
    await ProductController.deleteProduct(productID, warehouseID, context),
};

export const Mutations: MutationResolvers = {
  ...ProductMutations,
};
