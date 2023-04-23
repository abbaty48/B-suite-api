import { TypeResolvers } from '@server-models/@types/resolver_types';

export const Type: TypeResolvers = {
  __resolveType(_) {
    const type = _ as any;
    if (type.warehouseID) return 'Warehouse';
    if (type.customerID) return 'Customer';
    if (type.productID) return 'Product';
    if (type.supplyID) return 'Supply';
    if (type.staffID) return 'Staff';
    if (type.saleID) return 'Sale';
    if (type.name) return 'Category';

    return null;
  },
};
