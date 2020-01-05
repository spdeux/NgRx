import { User } from "../user";
import { createSelector, createFeatureSelector } from "@ngrx/store";

///////////////////////////////////////define state/////////////////////////////////
export interface UserState {
  maskUserName: boolean,
  currentUser: User
}

const initialState: UserState = {
  maskUserName: true,
  currentUser: null
}
////////////////////////////////////define selector/////////////////////////////////
const getUserFeatureSate = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
  getUserFeatureSate,
  state => state.maskUserName
)


export const getCurrentUser = createSelector(
  getUserFeatureSate,
  state => state.currentUser
)
/////////////////////////////////////define reducer////////////////////////////////
export function reducer(state: UserState = initialState, action): UserState {
  switch (action.type) {

    case 'MASK_USER_NAME':
      return {
        ...state,
        maskUserName: action.payload
      };

    default:
      return state;
  }
}
