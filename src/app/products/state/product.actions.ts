import { Action } from "@ngrx/store";
import { Product } from "../product";

//action types
export enum ProductActionTypes {
    ToggleProductCode = '[Product] Toggle Product Code',
    SetCurrentProduct = "[product] Set Current Product",
    ClearCurrentProduct = "[Product] Clear Current Product",
    InitializeCurrentProduct = "[Product] Initialize Current Product"
}

//action creator
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


//union all of actin creators
export type ProductActions = ToggleProductCode |
    SetCurrentProduct |
    ClearCurrentProduct |
    InitializeCurrentProduct;

