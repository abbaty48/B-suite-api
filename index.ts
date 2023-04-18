import cors from 'cors';
import morgan from 'morgan';
import config from 'config';
import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import bodyParser from 'body-parser';
import typeDefs from '@server-models/schema';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mongodbService } from '@/src/services/mongodb';
import { resolvers } from '@/src/resolvers/resolvers';
import { errorMiddlwares } from '@server-commons/middlewares/error';
import { assetMiddlwares } from '@server-commons/middlewares/assets';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

/**
 * Main Entry point for the server,
 * this method start the express server with configuration
 */
async function Main() {
  const app = express();
  // MIDDLEWARES
  app.use(cors<cors.CorsRequest>({ origin: ['http://localhost:3000'] }));
  app.use(morgan('combined'));
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: false }));
  // This `app` is the returned value from `express()`
  const httpServer = createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const _apolloServer = new ApolloServer({
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
  // IMAGE REQUEST
  // serve static image assets

  app.use('*', async (request, response, next) => {
    // set the res and req to context object for all resovers to leverage
    // _apolloServer.requestOptions.context = { request, response, config };
    next(); // makes the middleware move next
  });

  // ASSET MIDDLEWARES
  assetMiddlwares(app, __dirname);
  // ERROR HANDLE
  errorMiddlwares(app, __dirname);

  // start the mongodb server
  try {
    // start mongodb Server
    mongodbService();
    // start the apollo server
    await _apolloServer.start();
    // apply express app as middleware to the apollo server
    // start the express server
    httpServer.listen(config.get('server.port'), async () => {
      console.log(
        `B-Suite api started and listening on ${config.get('server.port')}`
      );
    });
  } catch (error) {
    console.log('ERROR: ', error.message);
  }
}
// start the server
Main();
