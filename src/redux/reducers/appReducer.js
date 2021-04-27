import { APP_SELECT_MENU } from '../types';

const arPath = window.location.pathname === '/archive';

const initialState = {
    selected: arPath ? 1 : 0, // 0 == NOTES, 1 == ARCHIVED
};

const layoutReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case APP_SELECT_MENU:
            return {
                ...state,
                selected: payload,
            };
        default:
            return {
                ...state,
            };
    }
};

export default layoutReducer;
