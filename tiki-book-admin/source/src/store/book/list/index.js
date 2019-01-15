import { createActions, createReducer } from 'reduxsauce';

export const INITIAL_STATE = {
    request: null,
    items: null,
    error: null,
};

// Handlers
const start = (state, action) => {
    return {
        ...state,
        request: {
            time: (new Date()).getTime(),
        },
    };
};

const succeed = (state, action) => {
    const {params} = action;
    return {
        request: null,
        error: null,
        items: params.items,
    };
};

const fail = (state, action) => {
    return {
        request: null,
        error: {
            details: action.error,
            time: (new Date()).getTime(),
        },
    };
};

// Action types and creators
export const { Types, Creators } = createActions({
    request: ['params'],
    start: ['params'],
    succeed: ['params'],
    fail: ['error'],
}, {});

// Reducer
export const reducer = createReducer(INITIAL_STATE, {
    [Types.START]: start,
    [Types.SUCCEED]: succeed,
    [Types.FAIL]: fail,
});