import { combineReducers } from "redux";
import GeneralReducer from "./general.reducer";
import CardReducer from "./card.reducer";


export default combineReducers({
  general: GeneralReducer,
  card: CardReducer,
});
