import React, { useEffect } from 'react';

import { connect } from 'react-redux';

import AppRouter from './AppRouter';
import Alert from './components/Alert/Alert';
import Layout from './components/Layout/Layout';
import { loadNotes } from './redux/actions/notesActions';
import './styles/global.scss';

const App = (props) => {
    const { app, loadNotes } = props;

    useEffect(() => {
        loadNotes();
    }, []);

    return (
        <div className={`app ${app.theme === 'dark' ? 'darkapp' : 'lightapp'}`}>
            <Layout>
                <AppRouter />
            </Layout>
            <Alert open={!!app.alert} message={app.alert} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        app: state.app,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadNotes: () => dispatch(loadNotes()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
