import { ActionReducerMap } from '@ngrx/store';
import { userReducer } from './user.reducer';
import { AppState } from '../../stores/app.state';
import { tokenReducer } from './token.reducer';

export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
  token: tokenReducer,
};
