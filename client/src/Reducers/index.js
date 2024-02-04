import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import PostReducer from "./PostReducer";


const reducers=combineReducers({AuthReducer,PostReducer})

export default reducers;