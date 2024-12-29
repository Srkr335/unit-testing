import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { store } from './store/store';
import client from './graphql/client';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App />
        </Provider>
    </ApolloProvider>
);
