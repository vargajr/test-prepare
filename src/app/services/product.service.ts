import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product, ProductStats } from '../model/product';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<Product> {

  productList$:BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  productStatistics$:BehaviorSubject<ProductStats> = new BehaviorSubject<ProductStats>({
    length: 0,
    featuredNr:0,
    activeNr:0
  });

  constructor(
    public http:HttpClient,
    public config:ConfigService
    ) {
      super(http, config, 'products');
      this.list$
        .pipe(
          tap(data => {
            const stats:ProductStats = {length: 0, featuredNr: 0, activeNr: 0};
            stats.length = data.length;
            stats.featuredNr = data.filter(prod => prod.featured).length;
            stats.activeNr = data.filter(prod => prod.active).length;
            this.productStatistics$.next(stats);
          })
        )
        .subscribe(data => this.productList$.next(data));
    }
}
