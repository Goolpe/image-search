import { FETCH_PHOTOS } from '../actions/types';

const initialState = {
  items: [],
  item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PHOTOS:
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    default:
      return state;
  }
}
