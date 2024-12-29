import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql', // Update port if needed
    cache: new InMemoryCache(),
});

export default client;
