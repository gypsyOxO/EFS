import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider } from 'react-apollo';
import {client} from "./graphql/apollo"


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
