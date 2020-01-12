import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as productActions from "./product.actions";
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class ProductEffects {

    constructor(private action$: Actions, private productService: ProductService) {

    }

    @Effect()
    LoadProducts = this.action$.pipe(
                    ofType(productActions.ProductActionTypes.Load),
                    mergeMap((action: productActions.Load) => this.productService.getProducts().pipe(
                    map(products => new productActions.LoadSuccess(products)),
                    catchError(err=>of(new productActions.LoadFail(err)))
        )));
}