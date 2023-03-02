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
exports.pubsub = void 0;
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("config"));
const http_1 = require("http");
const ws_1 = require("ws");
const schema_1 = __importDefault(require("./src/models/schema"));
const graphql_subscriptions_1 = require("graphql-subscriptions");
const ws_2 = require("graphql-ws/lib/use/ws");
const apollo_server_express_1 = require("apollo-server-express");
const schema_2 = require("@graphql-tools/schema");
const index_resolvers_1 = require("./src/resolvers/index.resolvers");
const express_1 = __importDefault(require("express"));
const apollo_server_core_1 = require("apollo-server-core");
exports.pubsub = new graphql_subscriptions_1.PubSub();
/**
 * Main Entry point for the server,
 * this method start the express server with configuration
 */
function Main() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        // MIDDLEWARES
        app.use((0, cors_1.default)());
        app.use((0, morgan_1.default)('combined'));
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: false }));
        // This `app` is the returned value from `express()`
        const httpServer = (0, http_1.createServer)(app);
        const schema = (0, schema_2.makeExecutableSchema)({ typeDefs: schema_1.default, resolvers: index_resolvers_1.resolvers });
        const _apolloServer = new apollo_server_express_1.ApolloServer({
            schema,
            csrfPrevention: true,
            cache: 'bounded',
            plugins: [
                // Proper shutdown for the HTTP server.
                (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
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
                (0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)({ embed: true }),
            ],
        });
        // Creating the WebSocket server
        const wsServer = new ws_1.WebSocketServer({
            // This is the `httpServer` we created in a previous step.
            server: httpServer,
            // Pass a different path here if your ApolloServer serves at
            // a different path.
            path: '/graphql',
        });
        // Hand in the schema we just created and have the
        // WebSocketServer start listening.
        const serverCleanup = (0, ws_2.useServer)({ schema }, wsServer);
        app.use('*', (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            // set the res and req to context object for all resovers to leverage
            _apolloServer.requestOptions.context = { request, response, config: config_1.default };
            next(); // makes the middleware move next
        }));
        // ERROR HANDLER
        app.use((err, req, res, next) => {
            if (res.headersSent) {
                return next(err);
            }
            const { status } = err;
            console.log('Error in server: ', status, err.message);
            res.status(status).json(err);
        });
        // start the mongodb server
        try {
            // start the apollo server
            yield _apolloServer.start();
            // apply express app as middleware to the apollo server
            _apolloServer.applyMiddleware({ app, path: '/graphql' });
            // start the express server
            httpServer.listen(config_1.default.get('server.port'), () => __awaiter(this, void 0, void 0, function* () {
                console.log(`B-Suite api started and listening on ${config_1.default.get('server.port')}`);
            }));
        }
        catch (error) {
            console.log('ERROR: ', error.message);
        }
    });
}
// start the server
Main();
