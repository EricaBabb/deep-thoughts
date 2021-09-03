import React from 'react';

//ApolloProvider is a special type of React component that we'll use to provide data to all of the other components.

//ApolloClient is a constructor function that will help initialize the connection to the GraphQL API server

//InMemoryCache enables the Apollo Client instance to cache API response data so that we can perform requests more efficiently.

//createHttpLink allows us to control how the Apollo Client makes a request. Think of it like middleware for the outbound network requests.

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

//renamed to Router b/c easier to work with
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

//uri = uniform resource identifier
// const httpLink = createHttpLink({
//   uri: '/graphql',
// });

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    //passing client as the prop to basically allow all the info enclosing ApolloProvider to reach the client (the httpLink website where we can view)
    <ApolloProvider client={client}>
      <Router>
        {/* wrapped div makes all of the child components on the page aware of the client-side routing that can take place now */}
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={Signup} />
    {/* ? means the parameter is optional */}
    <Route exact path="/profile/:username?" component={Profile} />
    <Route exact path="/thought/:id" component={SingleThought} /> 

    <Route component={NoMatch} />
  </Switch>
</div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}


export default App;
