import { Action } from "@ngrx/store";

export enum UserActionTypes {
    MaskUserName = '[User] mask user name'
}

export class MaskUserName implements Action {
    readonly type = UserActionTypes.MaskUserName;
    constructor(public payload: boolean) {
    }
}

export type UserActions = MaskUserName;