import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducers from './reducers/index';


const store = applyMiddleware(thunk, logger)(createStore)(reducers);

window.store = store;
export default store;
