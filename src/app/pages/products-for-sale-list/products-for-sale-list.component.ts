import { Component, OnInit } from '@angular/core';
import User from '../../../models/User';
import { Store } from '@ngrx/store';
import { AppState } from '../../../stores/app.state';
import { Router } from '@angular/router';
import { checkIfHasPermission } from '../../../services/checkIfUserHasPermission';
import { getProducts } from '../../../requests/products/getProducts';
import IProduct from '../../../interfaces/IProduct';
import { dispatchAlert } from '../../../services/dispatchAlert';
import { IError } from '../../../interfaces/IError';
import { dispatchConfirmBox } from '../../../services/dispatchConfirmBox';
import { deleteProductForSale } from '../../../requests/productsForSale/deleteProductForSale';
import IProductForSale from '../../../interfaces/IProductForSale';
import { getProductsForSale } from '../../../requests/productsForSale/getProductsForSale';

@Component({
  selector: 'app-products-for-sale-list',
  templateUrl: './products-for-sale-list.component.html',
})
export class ProductsForSaleListComponent implements OnInit {
  user = {} as User;
  token = '';

  products = [];
  headers = [
    'Product Id',
    'Product name',
    'Price per liter',
    'Storage liters',
    'Promo',
    'Created at',
    'Delete',
  ];
  loading = false;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store.select('user').subscribe((user) => {
      this.user = user;
    });

    this.store.select('token').subscribe((token) => {
      this.token = token;
    });

    this.loadProducts();
  }

  loadProducts() {
    getProductsForSale({ token: this.token })
      .then((data) => {
        const mappedProducts = data.productsForSale.map(
          (productForSale: IProductForSale) => [
            productForSale.productId,
            productForSale.product?.name || '',
            this.formatReal(productForSale.pricePerLiter),
            this.formatLiters(productForSale.storageLiters || 0),
            // @ts-ignore
            this.formatPromo(productForSale._promo),
            // @ts-ignore
            this.formatDate(productForSale._createdAt),
            () =>
              this.handleDeleteProductForSale(
                productForSale._id as string,
                productForSale.product?.name as string
              ),
          ]
        );

        this.products = [...mappedProducts];
      })
      .catch((error) => {
        if (!error.response?.data) {
          dispatchAlert({
            message: 'Server error',
            type: 'error',
          });
        } else {
          dispatchAlert({
            message: (error as IError).response.data.message,
            type: 'error',
          });
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }

  formatReal(value: number): string {
    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  formatLiters(value: number): string {
    return Intl.NumberFormat('pt-BR', {
      style: 'decimal',
    }).format(value);
  }

  formatPromo(value: number): string {
    return (
      Intl.NumberFormat('pt-BR', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(value) + '%'
    );
  }

  formatDate(date: Date) {
    return new Date(date).toLocaleString();
  }

  handleDeleteProductForSale(id: string, name: string) {
    dispatchConfirmBox({
      title: 'Delete product for sale',
      message: `Are you sure you want to delete "${name}"?`,
      onConfirm: async (available = false) => {
        if (!available) return;

        try {
          await deleteProductForSale({ id, token: this.token });

          dispatchAlert({
            message: `Product for sale "${name}" has been deleted`,
            type: 'success',
          });
        } catch (error) {
          dispatchAlert({
            message: (error as IError).response.data.message,
            type: 'error',
          });
        } finally {
          this.loadProducts();
        }
      },
    });
  }
}
