import { APP_SELECT_MENU, APP_THEME } from '../types';

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
