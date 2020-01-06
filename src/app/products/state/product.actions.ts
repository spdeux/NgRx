import { Action } from "@ngrx/store";
import { Product } from "../product";

//define action types
export enum ProductActionTypes {
    ToggleProductCode = '[Product] Toggle Product Code',
    SetCurrentProduct = "[product] Set Current Product",
    ClearCurrentProduct = "[Product] Clear Current Product",
    InitializeCurrentProduct = "[Product] Initialize Current Product",
    Load = "[Product] load",
    LoadSuccess = "[Product] Load Success",
    LoadFail = "[Product] Load Fail"
}

//define action creator
export class ToggleProductCode implements Action {
    readonly type = ProductActionTypes.ToggleProductCode;
    constructor(public payload: boolean) {

    }
}

export class SetCurrentProduct implements Action {
    readonly type = ProductActionTypes.SetCurrentProduct;
    constructor(public payload: Product) {

    }
}

export class ClearCurrentProduct implements Action {
    readonly type = ProductActionTypes.ClearCurrentProduct;
}

export class InitializeCurrentProduct implements Action {
    readonly type = ProductActionTypes.InitializeCurrentProduct;
}


export class Load implements Action {
    readonly type = ProductActionTypes.Load;
}

export class LoadSuccess implements Action {
    readonly type = ProductActionTypes.LoadSuccess;
    constructor(public payload: Product[]) {

    }
}

export class LoadFail implements Action {
    readonly type = ProductActionTypes.LoadFail;
    constructor(public payload: string) {

    }
}
//define action type which is union all of all actin creators
export type ProductActions = ToggleProductCode |
    SetCurrentProduct |
    ClearCurrentProduct |
    InitializeCurrentProduct |
    Load |
    LoadSuccess |
    LoadFail;

