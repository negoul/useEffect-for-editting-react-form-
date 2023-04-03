import {
  GENERAL_SET_CONFIGS, GENERAL_SET_FILTER, GENERAL_SET_FILTER_BAR
} from "../types";

const initialState = {
  configs: {},
  filter: {},
  filterBar: false
};

const GeneralReducer = (state = initialState, action) => {
  switch (action.type) {
    case GENERAL_SET_CONFIGS:
      return { ...state, configs: action.data };
    case GENERAL_SET_FILTER:
      return { ...state, filter: action.data };
    case GENERAL_SET_FILTER_BAR:
      return { ...state, filterBar: action.data };
    default:
      return state;
  }
};

export default GeneralReducer;
