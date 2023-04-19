import fs from 'fs';
import cors from 'cors';
import morgan from 'morgan';
import config from 'config';
import express from 'express';
import { models } from 'mongoose';
import { WebSocketServer } from 'ws';
import bodyParser from 'body-parser';
import { GraphQLError } from 'graphql';
import { Server, createServer } from 'http';
import { ApolloServer } from '@apollo/server';
import { useServer } from 'graphql-ws/lib/use/ws';
import { resolvers } from '@/src/resolvers/resolvers';
import { mongodbService } from '@/src/services/mongodb';
import { expressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { errorMiddlwares } from '@server-commons/middlewares/error';
import { assetMiddlwares } from '@server-commons/middlewares/assets';
import { IResolverContext } from '@server-models/interfaces/IResolverContext';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

/**
 * Main Entry point for the server,
 * this method start the express server with configuration
 */
async function Main() {
  // This `app` is the returned value from `express()`
  const app = express();
  // Create a httpServer and use express app
  const httpServer: Server = createServer(app);
  // Make an executable schema from the schema.graphql and resolver
  const schema = makeExecutableSchema({
    typeDefs: fs.readFileSync('src/models/schemas/schema.graphql', {
      encoding: 'utf-8',
    }),
    resolvers,
  });
  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if your ApolloServer serves at
    // a different path.
    path: '/v2',
  });
  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const serverCleanup = useServer({ schema }, wsServer);
  //
  const apolloServer = new ApolloServer<IResolverContext>({
    schema,
    cache: 'bounded',
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
  // MIDDLEWARES
  app.use(
    '/v2',
    // SET UP CORS
    cors<cors.CorsRequest>({ origin: ['http://localhost:3000'] }),
    // BODYPARSER
    bodyParser.json(),
    // MORGAN
    morgan('combined'),
    // ASSET MIDDLEWARES
    assetMiddlwares(__dirname),
    // ERROR HANDLE
    errorMiddlwares(__dirname),
    // EXPRESSMIDDLWARE
    expressMiddleware(apolloServer, {
      context: async () => ({
        models,
        config,
      }), // end context
    }) // end expressMiddleware
  ); // end MIDDLWARE
  //
  try {
    // start the apollo server
    await apolloServer.start();
    // start mongodb Server
    await mongodbService(),
      // apply express app as middleware to the apollo server
      // start the express server
      await new Promise<void>((resolve) => {
        httpServer.listen(config.get('server.port'), resolve);
      });
    console.log(
      `B-Suite api started and listening on ${config.get('server.port')}`
    );
  } catch (error) {
    throw new GraphQLError(error.message, {
      extensions: { code: error.code },
    }); // end GraphQLError
  } // end catch
} // end Main
// start the server
Main();
