import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export const PRODUCT_FOUND = 'product found';
const rootUrl = 'https://world.openfoodfacts.org/api/v0/product';

@Injectable({
  providedIn: 'root'
})
export class OpenFoodFactsService {

  constructor(
    private http: HttpClient
  ) { }

  getInfoFromBarCode(barCode: string) {
    const url = `${rootUrl}/${barCode}.json`;
    return this.http.get<OpenFoodFactsRes>(url).pipe(
      map(data => {
        if (data.status_verbose === PRODUCT_FOUND) {
          return data.product;
        } else {
          throw new Error('Product not found in database');
        }
      })
    );
  }
}

export interface OpenFoodFactsRes {
  code: string;
  product: Product;
  status: number;
  status_verbose: string;
}

export interface Product {
  image_thumb_url: string;
  product_name_fr: string;
  code: string;
  [key: string]: any;
}
