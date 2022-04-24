import User from '../../models/User';

export const SET_USER = 'SET_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

export function userReducer(
  state: User | null = null,
  action: { type: string; payload: User | object }
): any {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case UPDATE_USER:
      return { ...state, ...action.payload };
    case DELETE_USER:
      return null;
    default:
      return state;
  }
}
