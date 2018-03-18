import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function(state = {}, action){
  switch (action.type){
  case DELETE_POST:
  // look at the state object, if it has a key of the post id, just drop it/omit it.return a new object that does not contain that id anymore. object for state management is good
    return _.omit(state, action.payload);
  case FETCH_POST:
    // const post = action.payload.data;
    // const newState = { ...state,   };
    // newState[post.id] = post;
    // return newState; es5, below is es6
    return { ...state, [action.payload.data.id]: action.payload.data };
  case FETCH_POSTS:
    return _.mapKeys(action.payload.data, 'id');
  default:
    return state;
  }
}
