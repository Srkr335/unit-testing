const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
const connectDB = require('./config/db');

connectDB(); // Establish connection to MongoDB

// Create an instance of ApolloServer
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const startServer = async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });
    console.log(`🚀 Server ready at ${url}`);
};

startServer();
