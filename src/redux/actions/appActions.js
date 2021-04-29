import { APP_SELECT_MENU, APP_THEME, SET_ALERT, UNSET_ALERT } from '../types';

export const selectMenu = (index) => {
    return {
        type: APP_SELECT_MENU,
        payload: index,
    };
};

export const switchTheme = () => {
    return {
        type: APP_THEME,
    };
};

export const setAlert = (msg) => (dispatch) => {
    setTimeout(() => dispatch({ type: UNSET_ALERT }), 4000);
    dispatch({
        type: SET_ALERT,
        payload: msg,
    });
};
