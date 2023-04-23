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

export const Subscriptions: SubscriptionResolvers = {
  ...ProductSubscriptions,
};
