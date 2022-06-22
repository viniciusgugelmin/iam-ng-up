import { Component, OnInit } from '@angular/core';
import User from '../../../models/User';
import { Store } from '@ngrx/store';
import { AppState } from '../../../stores/app.state';
import { Router } from '@angular/router';
import { checkIfHasPermission } from '../../../services/checkIfUserHasPermission';
import { getAllStorage } from '../../../requests/storage/getAllStorage';
import IStorage from '../../../interfaces/IStorage';
import { dispatchAlert } from '../../../services/dispatchAlert';
import { IError } from '../../../interfaces/IError';
import { getSales } from '../../../requests/sales/getSales';
import ISale from '../../../interfaces/ISale';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
})
export class SalesListComponent implements OnInit {
  user = {} as User;
  token = '';

  sales = [];
  headers = ['Product name', 'Customer name', 'Liters', 'Amount paid'];
  loading = false;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store.select('user').subscribe((user) => {
      this.user = user;
    });

    this.store.select('token').subscribe((token) => {
      this.token = token;
    });

    if (!checkIfHasPermission(this.user, 'sales', 'read', false)) {
      this.router.navigate(['/home']);
      return;
    }

    this.loadSales();
  }

  loadSales() {
    getSales({ token: this.token })
      .then((data) => {
        const mappedSales = data.sales.map((sale: ISale) => [
          sale.product?.name ?? '-',
          sale.customer?.name ?? '-',
          this.formatLiters(sale.liters),
          sale.amountPaid ? this.formatReal(sale.amountPaid) : '-',
        ]);

        this.sales = [...mappedSales];
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
}
