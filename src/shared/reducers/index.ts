import { combineReducers, Reducer } from 'redux';
// import { routerReducer } from 'react-router-redux';
import user,{ UserState } from './user/user.reducer';

export interface IRootState {
    readonly user: UserState;
}

const rootReducer: Reducer<IRootState> = combineReducers<IRootState>({
    user
})

// export default rootReducer;
export default rootReducer;