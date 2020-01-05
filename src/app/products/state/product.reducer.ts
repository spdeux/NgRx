import { Product } from "../product";
import * as fromRoot from "../../state/app.state"; //lazy loding
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductActions, ProductActionTypes } from "./product.actions";

///////////////////////////////////////define state////////////////////////////////////
export interface State extends fromRoot.State {  //lazy loding
  products: ProductState
}

export interface ProductState {
  showProductCode: boolean,
  currentProduct: Product,
  products: Product[]
}

const initialState: ProductState = {  //initialize productSate
  showProductCode: true,
  currentProduct: null,
  products: []
}

////////////////////////////////////define selector////////////////////////////////////
const getProductFeatureState = createFeatureSelector<ProductState>('products'); //create feature selectore with the name in product module

export const getShowProductCode = createSelector( //create selectore for showProductCode
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProduct = createSelector( //create selectore for currentProduct
  getProductFeatureState,
  state => state.currentProduct
)

export const getProducts = createSelector( //create selectore for products
  getProductFeatureState,
  state => state.products
)
/////////////////////////////////////define reducer////////////////////////////////
export function reducer(state: ProductState = initialState, action: ProductActions): ProductState {  //strongly typed state & actions
  switch (action.type) {

    case ProductActionTypes.ToggleProductCode://'TOGGLE_PRODUCT_CODE':
      return {
        ...state,
        showProductCode: action.payload //payload is a boolean
      };
    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        currentProduct: { ...action.payload } //payload is an object
      };
    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProduct: null
      };
    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProduct: {
          id: 0,
          productName: '',
          productCode: 'NEW',
          description: '',
          starRating: 0
        }
      };

    default:
      return state;
  }
}

