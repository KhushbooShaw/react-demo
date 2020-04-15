import { IUserResponse } from '../../models/user.model';
import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE } from '../action-type';

export const ACTION_TYPES = {
    FETCH_ALL_USERS: 'user/FETCH_ALL_USERS'
  };
  
  export const initialState = {
    loading: false,
    users: {} as IUserResponse
  };
  
  export type UserState = Readonly<typeof initialState>;
  
  // Reducer
  export default (state: UserState = initialState, action: any): UserState => {
    switch (action.type) {
      case REQUEST(ACTION_TYPES.FETCH_ALL_USERS):
        return {
          ...state,
          loading: true
        };
      case SUCCESS(ACTION_TYPES.FETCH_ALL_USERS):
        return {
          ...state,
          loading: false,
          users: action.payload
        };
      case FAILURE(ACTION_TYPES.FETCH_ALL_USERS):
        return {
          ...state,
          loading: false
        };
      default:
        return state;
    }
  };

  const apiUrl = 'api/users';
  
  // Actions
   
  export const getEntities = () => ({
    type: ACTION_TYPES.FETCH_ALL_USERS,
    payload: axios.get<IUserResponse>(apiUrl)
  });
  