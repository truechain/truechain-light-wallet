import { applyMiddleware, createStore } from "redux";
import reducers from './reducers/index';


const store=(createStore)(reducers);

window.store=store;
export default store;