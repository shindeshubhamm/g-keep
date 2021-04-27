import React from 'react';

import ls from 'local-storage';

import AppRouter from './AppRouter';
import Layout from './components/Layout/Layout';

import './styles/global.scss';

const App = (props) => {
    const theme = ls.get('theme');

    return (
        <div className={`app ${theme === 'dark' ? 'darkapp' : 'lightapp'}`}>
            <Layout>
                <AppRouter />
            </Layout>
        </div>
    );
};

export default App;
