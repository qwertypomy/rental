import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app';
import { HomeView, LoginView, RegisterView, ProtectedView, NotFoundView } from './containers';
import requireAuthentication from './utils/requireAuthentication';

export default(
    <Route path="/" component={App}>
        <IndexRoute component={HomeView} />
        <Route path="login" component={LoginView} />
        <Route path="register" component={RegisterView} />
        <Route path="protected" component={requireAuthentication(ProtectedView)} />
        <Route path="*" component={NotFoundView} />
    </Route>
);
