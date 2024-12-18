import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import client from '../graphql/client';
import { store } from '../store/store';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
    return (
        <ApolloProvider client={client}>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </ApolloProvider>
    );
}
