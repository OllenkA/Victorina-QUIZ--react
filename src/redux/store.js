import {createStore, applyMiddleware, combineReducers} from "redux";
import reducer from "./reducer";

const reducers = combineReducers({
    main: reducer}
);

let store = createStore(reducers, applyMiddleware());

export default store;