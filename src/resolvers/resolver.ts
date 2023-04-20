import { Queries } from '@server-resolvers/queries';
import { Mutations } from '@server-resolvers/mutations';
import { Subscriptions } from '@server-resolvers/subscriptions';

export const resolvers = {
  Query: Queries,
  Mutation: Mutations,
  Subscription: Subscriptions,
};
