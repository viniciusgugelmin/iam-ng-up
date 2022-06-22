import { Component, OnInit } from '@angular/core';
import { getProductsForSale } from 'src/requests/productsForSale/getProductsForSale';
import { dispatchAlert } from '../../../services/dispatchAlert';
import { IError } from '../../../interfaces/IError';
import { postSale } from 'src/requests/sales/postSale';
import { dispatchConfirmBox } from '../../../services/dispatchConfirmBox';

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
})
export class ApplicationPageComponent implements OnInit {
  actualYear = new Date().getFullYear();
  products = [];

  loading = false;

  constructor() {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;

    getProductsForSale({})
      .then((data) => {
        this.products = data.productsForSale;
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

  formatPromo(value: number): string {
    return (
      Intl.NumberFormat('pt-BR', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(value) + '%'
    );
  }

  handleBuyProductForSale(p: any) {
    if (p.storageLiters === 0) {
      return;
    }

    if (p.product.isAlcoholic) {
      return dispatchAlert({
        message: 'You must log in to buy alcohol',
        type: 'error',
      });
    }

    dispatchConfirmBox({
      title: 'Buy product for sale',
      message: `Are you sure you want to buy "${p.product.name || p._id}"?`,
      onConfirm: async (available = false) => {
        if (!available) return;

        try {
          await postSale({
            sale: {
              productForSaleId: p._id,
              customersDocument: '00000000000',
              liters: 1,
            },
          });

          dispatchAlert({
            message: `You bought "${
              p.product.name || p._id
            }", wait a little bit to get it...`,
            type: 'success',
          });

          this.loadProducts();
        } catch (error) {
          dispatchAlert({
            message: (error as IError).response.data.message,
            type: 'error',
          });
        }
      },
    });
  }
}
