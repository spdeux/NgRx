import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store, select } from '@ngrx/store';
import * as fromProduct from "../state/product.reducer"; // store type
import * as productActions from "../state/product.actions";
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;
  displayCode: boolean;
  products: Product[];
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;


  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  // sub: Subscription;
  componentActive: boolean = true; // instead of using Subscription object we use this variable.

  constructor(private store: Store<fromProduct.State>,
    private productService: ProductService) { }

  ngOnInit(): void {
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   selectedProduct => this.selectedProduct = selectedProduct
    // );

    this.store.pipe(select(fromProduct.getCurrentProduct)).subscribe(  //use the redux to get current selected product.
      currentProduct => this.selectedProduct = currentProduct
    );
    //...................................................................
    //comment due to using effects
    // this.productService.getProducts().subscribe(
    //   (products: Product[]) => this.products = products,
    //   (err: any) => this.errorMessage = err.error
    // );

    //effect
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    this.store.dispatch(new productActions.Load());
    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    //,
    // takeWhile(() => this.componentActive))  //to prevent leak of memory 
    // .subscribe((products: Product[]) => this.products = products);
    //........................................................................

    // TODO: Unsubscribe
    // this.store.pipe(select('products')).subscribe(  //store without selector
    //   products => {
    //     //if (products) { //without initialization of state, we need check undefinde state but with initialization we do not need check state.
    //     this.displayCode = products.showProductCode;
    //     //}
    //   });

    //store with selector which is defined in reducer file
    this.store.pipe(select(fromProduct.getShowProductCode)).subscribe( //store with specific selector for only showProductCode
      showProductCode => this.displayCode = showProductCode
    );
  }
  //....................................................................
  ngOnDestroy(): void {
    // this.sub.unsubscribe();
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    // this.store.dispatch({
    //   type: 'TOGGLE_PRODUCT_CODE',
    //   payload: value
    // });
    this.store.dispatch(new productActions.ToggleProductCode(value));  //strongly type action
  }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    // this.productService.changeSelectedProduct(product); //use BehaviorSubject to communucate between components
    this.store.dispatch(new productActions.SetCurrentProduct(product)); //use action to communucate between components in order to set current product
  }

}
