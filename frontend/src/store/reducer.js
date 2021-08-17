import * as actionTypes from './actionTypes';


export const initialState = {
    userId: null,
    token: null,
    error: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                userId: action.userId,
                token: action.token,
                error: null
            }

        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                userId: null,
                token: null,
                error: action.error
            }

        case actionTypes.LOGOUT:
            return {
                ...state,
                userId: null,
                error: null,
                token: null
            }

        case actionTypes.SET_ERROR:
            return {
                ...state,
                error: action.error
            }

        case actionTypes.REMOVE_ERROR: {
            return {
                ...state,
                error: null
            }
        }

        case actionTypes.SET_AUTH_DATA: {
            return {
                ...state,
                userId: action.user,
                token: action.token,
            }
        }

        default:
            return { ...state };
    }
};

export default reducer;