import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import Notes from './components/Notes/Notes';

const AppRouter = () => {
    return (
        <Switch>
            <Route exact path="/" component={Notes} />
            <Route exact path="/home" component={Notes} />
            <Route exact path="/archive" component={Notes} />
            <Route path="*" component={() => <Redirect to="/" />} />
        </Switch>
    );
};

export default AppRouter;
