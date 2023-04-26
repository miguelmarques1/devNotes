import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore } from "redux";
import { persistReducer } from "redux-persist";
import Reducers from "./reducers/index";
import hardSet from "redux-persist/es/stateReconciler/hardSet";

const persistedReducer = persistReducer({
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
        'notes'
    ],
    stateReconciler: hardSet
}, Reducers);


const store = createStore(persistedReducer);


export default store;