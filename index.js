const { ApolloServer} = require('apollo-server');
const { PubSub } = require('graphql-subscriptions');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');

// NOT FULLY SET UP - Allows subscribers of certain users to see new posts that they release
const pubsub = new PubSub();

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req,pubsub })
});

mongoose
    .connect(MONGODB)
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: PORT });
    })
    .then((res) => {
    console.log(`Server running at ${res.url}`);
})
.catch(err => {
    console.error(err)
})