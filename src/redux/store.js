import {createStore, applyMiddleware, combineReducers} from "redux";
import reducer from "./reducer";
import thunkMiddleware from 'redux-thunk';

const reducers = combineReducers({
    main: reducer}
);

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;