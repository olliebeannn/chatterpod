import axios from 'axios';

import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const fetchedUser = await axios.get('/api/auth/currentUser');
  dispatch({ type: FETCH_USER, payload: fetchedUser.data });
};
