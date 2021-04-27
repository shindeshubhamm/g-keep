import React from 'react';

import ls from 'local-storage';
import { connect } from 'react-redux';

import AppRouter from './AppRouter';
import Layout from './components/Layout/Layout';

import './styles/global.scss';

const App = (props) => {
    const { app } = props;

    return (
        <div className={`app ${app.theme === 'dark' ? 'darkapp' : 'lightapp'}`}>
            <Layout>
                <AppRouter />
            </Layout>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        app: state.app,
    };
};

export default connect(mapStateToProps)(App);
