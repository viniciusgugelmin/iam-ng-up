export const SET_TOKEN = 'SET_TOKEN';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const DELETE_TOKEN = 'DELETE_TOKEN';

export function tokenReducer(
  state: string = '',
  action: { type: string; payload: string }
): any {
  switch (action.type) {
    case SET_TOKEN:
    case UPDATE_TOKEN:
      return action.payload;
    case DELETE_TOKEN:
      return '';
    default:
      return state;
  }
}
