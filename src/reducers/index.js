import { combineReducers } from 'redux';

import ipfs from './ipfsReducer';
import lot from './lotReducer';

// our store/state has 

export default combineReducers({
  ipfs,
  lot,
})