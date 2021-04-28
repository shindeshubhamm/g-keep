import React, { useEffect } from 'react';

import ls from 'local-storage';
import { connect } from 'react-redux';

import AppRouter from './AppRouter';
import Layout from './components/Layout/Layout';
import { loadNotes } from './redux/actions/notesActions';
import './styles/global.scss';

const App = (props) => {
    const { app, loadNotes } = props;

    useEffect(() => {
        loadNotes();
    }, []);

    // ls.set(Date.now(), { title: 'My Note', desc: 'My note description!' });
    ls.set('notes', [
        1619597186620,
        1619597186557,
        1619597209743,
        1619597209827,
    ]);

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

const mapDispatchToProps = (dispatch) => {
    return {
        loadNotes: () => dispatch(loadNotes()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
