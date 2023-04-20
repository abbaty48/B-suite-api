"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("config"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const ws_1 = require("ws");
const body_parser_1 = __importDefault(require("body-parser"));
const graphql_1 = require("graphql");
const http_1 = require("http");
const server_1 = require("@apollo/server");
const ws_2 = require("graphql-ws/lib/use/ws");
const resolver_1 = require("./src/resolvers/resolver");
const schema_1 = require("./src/models/schemas/schema");
const mongodb_1 = require("./src/services/mongodb");
const express4_1 = require("@apollo/server/express4");
const schema_2 = require("@graphql-tools/schema");
const error_1 = require("./src/commons/middlewares/error");
const assets_1 = require("./src/commons/middlewares/assets");
const authenticationMiddleware_1 = require("./src/commons/auths/authenticationMiddleware");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const authorize_directives_1 = require("./src/directives/authorize.directives");
/**
 * Main Entry point for the server,
 * this method start the express server with configuration
 */
function Main() {
    return __awaiter(this, void 0, void 0, function* () {
        // This `app` is the returned value from `express()`
        const app = (0, express_1.default)();
        // Create a httpServer and use express app
        const httpServer = (0, http_1.createServer)(app);
        // Make an executable schema from the schema.graphql and resolver
        const schema = (0, authorize_directives_1.authorizeRoleDirectiveTransformer)((0, schema_2.makeExecutableSchema)({
            typeDefs: schema_1.typeDefs,
            resolvers: resolver_1.resolvers,
        }));
        // Creating the WebSocket server
        const wsServer = new ws_1.WebSocketServer({
            // This is the `httpServer` we created in a previous step.
            server: httpServer,
            // Pass a different path here if your ApolloServer serves at
            // a different path.
            path: '/v1',
        });
        // Hand in the schema we just created and have the
        // WebSocketServer start listening.
        const serverCleanup = (0, ws_2.useServer)({ schema }, wsServer);
        //
        const apolloServer = new server_1.ApolloServer({
            schema,
            cache: 'bounded',
            plugins: [
                // Proper shutdown for the HTTP server.
                (0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
                // Proper shutdown for the WebSocket server.
                {
                    serverWillStart() {
                        return __awaiter(this, void 0, void 0, function* () {
                            return {
                                drainServer() {
                                    return __awaiter(this, void 0, void 0, function* () {
                                        yield serverCleanup.dispose();
                                    });
                                },
                            };
                        });
                    },
                },
            ],
        });
        try {
            // start the apollo server
            yield apolloServer.start();
            // MIDDLEWARES
            app.use('/v1', 
            // SET UP CORS
            (0, cors_1.default)({ origin: ['http://localhost:3000'] }), 
            // BODYPARSER
            body_parser_1.default.json(), 
            // MORGAN
            (0, morgan_1.default)('combined'), 
            // ASSET MIDDLEWARES
            (0, assets_1.assetMiddlwares)(__dirname), 
            // ERROR HANDLE
            (0, error_1.errorMiddlwares)(__dirname), 
            // EXPRESSMIDDLWARE
            (0, express4_1.expressMiddleware)(apolloServer, {
                context: ({ req }) => __awaiter(this, void 0, void 0, function* () {
                    // perform authentication
                    const authenticatedStaff = yield (0, authenticationMiddleware_1.authenticationToken)(req, config_1.default.get('jwt.privateKey'));
                    return {
                        models: mongoose_1.models,
                        config: config_1.default,
                        authenticatedStaff,
                        privateKey: config_1.default.get('jwt.privateKey'),
                    }; // end return
                }), // end context
            }) // end expressMiddleware
            ); // end MIDDLWARE
            //
            // start mongodb Server
            yield (0, mongodb_1.mongodbService)(),
                // apply express app as middleware to the apollo server
                // start the express server
                yield new Promise((resolve) => {
                    httpServer.listen(config_1.default.get('server.port'), resolve);
                });
            console.log(`B-Suite api started and listening on ${config_1.default.get('server.port')}`);
        }
        catch (error) {
            throw new graphql_1.GraphQLError(error.message, {
                extensions: { code: error.code },
            }); // end GraphQLError
        } // end catch
    });
} // end Main
// start the server
Main();
