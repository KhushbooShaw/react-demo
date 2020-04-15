import { createStore } from "redux";
import rootReducer from "../shared/reducers/index";

const store = (initialState?:any) => createStore(rootReducer, initialState);

export default store;