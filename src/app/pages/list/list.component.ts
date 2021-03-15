import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductStats } from 'src/app/model/product';
import { ConfigService } from 'src/app/services/config.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  productList$:Observable<Product[]> = this.productService.productList$;
  productStatistics$:Observable<ProductStats> = this.productService.productStatistics$;

  constructor(
    private productService:ProductService,
    private config:ConfigService
  ) { }

  ngOnInit(): void {
    this.productService.getAll();
  }

}
