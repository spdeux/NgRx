import { UserState } from "../user/state/user.reducer";

// import { ProductState } from "../products/state/product.reducer";

export interface State {
    // products: ProductState, //because Product module load lazy so state should be loaded lazy, so delete from here.
    user: UserState
}