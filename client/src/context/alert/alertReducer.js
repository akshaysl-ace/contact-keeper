import { REMOVE_ALERT, SET_ALERT } from "../types";

export const reducer = (state, action) => {
    const { payload, type } = action;
    switch (type) {

        case SET_ALERT:
            return [
                ...state, payload
            ];

        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);

        default:
            return state;
    }
};

export default reducer;