import ls from 'local-storage';

import { APP_SELECT_MENU, APP_THEME, SET_ALERT, UNSET_ALERT } from '../types';

const arPath = window.location.pathname === '/archive';
const theme = ls.get('theme') === 'dark' ? 'dark' : 'light';

const initialState = {
    selected: arPath ? 1 : 0, // 0 == NOTES, 1 == ARCHIVED
    theme,
    alert: '',
};

const layoutReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case APP_SELECT_MENU:
            return {
                ...state,
                selected: payload,
            };
        case APP_THEME:
            ls.set('theme', state.theme === 'dark' ? 'light' : 'dark');
            return {
                ...state,
                theme: ls.get('theme'),
            };
        case SET_ALERT:
            return {
                ...state,
                alert: payload,
            };
        case UNSET_ALERT:
            return {
                ...state,
                alert: '',
            };
        default:
            return {
                ...state,
            };
    }
};

export default layoutReducer;
