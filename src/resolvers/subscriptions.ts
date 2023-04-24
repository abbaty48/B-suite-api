import { SubscriptionResolvers } from '@server-models/@types/resolver_types';

const ProductSubscriptions: SubscriptionResolvers = {
  productAddSubscription: {
    subscribe: (_, __, { pubSub }: any) =>
      pubSub.asyncIterator('LISTEN_ADD_PRODUCT'),
  }, // end productAddSubscription
  productEditSubscription: {
    subscribe: (_, __, { pubSub }: any) =>
      pubSub.asyncIterator('LISTEN_EDIT_PRODUCT'),
  },
  productDeleteSubscription: {
    subscribe: (_, __, { pubSub }: any) =>
      pubSub.asyncIterator('LISTEN_DELETE_PRODUCT'),
  },
}; // end ProductSubscriptions

const StaffSubscriptions: SubscriptionResolvers = {
  staffAddSubscription: {
    subscribe: (_, __, { pubSub }: any) =>
      pubSub.asyncIterator('LISTEN_ADD_STAFF'),
  },
  staffDeleteSubscription: {
    subscribe: (_, __, { pubSub }: any) =>
      pubSub.asyncIterator('LISTEN_DELETE_STAFF'),
  },
}; // end StaffSubscripbtions

const CategorySubscriptions: SubscriptionResolvers = {
  categoryAddSubscription: {
    subscribe: (_, __, { pubSub }: any) =>
      pubSub.asyncIterator('LISTEN_ADD_CATEGORY'),
  },
  categoryEditSubscription: {
    subscribe: (_, __, { pubSub }: any) =>
      pubSub.asyncIterator('LISTEN_EDIT_CATEGORY'),
  },
  categoryDeleteSubscription: {
    subscribe: (_, __, { pubSub }: any) =>
      pubSub.asyncIterator('LISTEN_DELETE_CATEGORY'),
  },
};

export const Subscriptions: SubscriptionResolvers = {
  ...CategorySubscriptions,
  ...ProductSubscriptions,
  ...StaffSubscriptions,
};
