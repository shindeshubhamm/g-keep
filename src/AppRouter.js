import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import Archive from './components/Archive/Archive';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import Notes from './components/Notes/Notes';

const RouteWithLayout = (props) => {
    const { component: Component, ...rest } = props;

    const userToken = localStorage.getItem('user');

    if (rest.path === '/login') {
        if (!userToken) {
            return <Route path="/login" component={Login} />;
        }
        return <Redirect to="/" />;
    }

    if (!userToken) {
        return <Redirect to="/login" />;
    }

    return (
        <Route
            {...rest}
            render={(props) => (
                <Layout>
                    <Component {...props} />
                </Layout>
            )}
        />
    );
};

const AppRouter = () => {
    return (
        <Switch>
            <RouteWithLayout exact path="/" component={Notes} />
            <RouteWithLayout exact path="/home" component={Notes} />
            <RouteWithLayout exact path="/archive" component={Archive} />
            <RouteWithLayout path="/login" component={Login} />
            <Route path="*" component={() => <Redirect to="/" />} />
        </Switch>
    );
};

export default AppRouter;
