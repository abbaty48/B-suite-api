import { GraphQLSchema, defaultFieldResolver } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mapSchema, MapperKind, getDirective } from '@graphql-tools/utils';

import { IStaff } from '@server-models/databases/mongodb/interfaces/IStaff';
import { IResolverContext } from '@server-models/interfaces/IResolverContext';
import { AuthorizeStaff } from '@server-commons/auths/authorizationMiddleware';
import { RolePrevileges } from '@server-models/databases/mongodb/enums/RolePrevilege';

function authRoleDirective(
  directiveName: string,
  AuthorizeStaff: (
    previlege: RolePrevileges,
    authenticatedStaff: IStaff
  ) => IStaff
) {
  const typeDirectiveArgumentMaps: Record<string, any> = {};
  return {
    authorizeRoleDirectiveTransformer: (schema: GraphQLSchema) =>
      mapSchema(schema, {
        [MapperKind.TYPE]: (type) => {
          const authorizeRoleDirective = getDirective(
            schema,
            type,
            directiveName
          )?.[0];
          if (authorizeRoleDirective) {
            typeDirectiveArgumentMaps[type.name] = authorizeRoleDirective;
          }
          return undefined;
        },
        [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
          const authorizeRoleDirective =
            getDirective(schema, fieldConfig, directiveName)?.[0] ??
            typeDirectiveArgumentMaps[typeName];
          if (authorizeRoleDirective) {
            const { previlege } = authorizeRoleDirective;
            if (previlege) {
              const { resolve = defaultFieldResolver } = fieldConfig;
              fieldConfig.resolve = function (
                source,
                args,
                context: IResolverContext,
                info
              ) {
                AuthorizeStaff(
                  previlege as RolePrevileges,
                  context.authenticatedStaff
                );
                return resolve(source, args, context, info);
              };
              return fieldConfig;
            }
          }
        },
      }),
  };
}

export const { authorizeRoleDirectiveTransformer } = authRoleDirective(
  'authorizeRole',
  AuthorizeStaff
);

/* let schema = makeExecutableSchema({
  typeDefs: [
    authorizeRoleDirectiveTypeDefs,
    `
      type User @auth(requires: USER) {
        name: String
        banned: Boolean @auth(requires: ADMIN)
        canPost: Boolean @auth(requires: REVIEWER)
      }

      type Query {
        users: [User]
      }
    `,
  ],
  resolvers: {
    Query: {
      users: () => [
        {
          banned: true,
          canPost: false,
          name: 'Ben',
        },
      ],
    },
  },
});
schema = authorizeRoleDirectiveTransformer(schema); */
