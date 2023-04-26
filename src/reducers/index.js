import { combineReducers } from "redux";
import NotesReducer from "./NotesReducer";

const Reducers = combineReducers({
    notes: NotesReducer
});

export default Reducers;