import { APP_SELECT_MENU } from '../types';

export const selectMenu = (index) => {
    return {
        type: APP_SELECT_MENU,
        payload: index,
    };
};
