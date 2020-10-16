import {
    createSlice,
    configureStore,
    getDefaultMiddleware,
} from "@reduxjs/toolkit";
// import logger from "redux-logger";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";

const initialState = {
    apiToken: null,
};

const reducers = {
    // apiToken
    setApiToken: (
        state,
        { payload: newApiToken }
    ) => {
        state.apiToken = newApiToken;
    },
    unsetApiToken: (state) => {
        state.apiToken = null;
    }
};

const stateSlice = createSlice({
    name: "state",
    initialState,
    reducers,
});

const persistConfig = {
    key: "state",
    storage,
    stateReconciler: hardSet,
    blacklist: [],
};

export const { actions } = stateSlice;

const reducer = (state, action) => stateSlice.reducer(state, action);

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
    ] /* devTools: false*/,
});
export const persistor = persistStore(store);