import { Component, OnInit } from '@angular/core';
import User from '../../../models/User';
import { Store } from '@ngrx/store';
import { AppState } from '../../../stores/app.state';
import { Router } from '@angular/router';
import { checkIfHasPermission } from '../../../services/checkIfUserHasPermission';
import { dispatchAlert } from '../../../services/dispatchAlert';
import { IError } from '../../../interfaces/IError';
import { getCustomers } from '../../../requests/customers/getCustomers';
import ICustomer from '../../../interfaces/ICustomer';
import { dispatchConfirmBox } from '../../../services/dispatchConfirmBox';
import { deleteCustomer } from '../../../requests/customers/deleteCustomer';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
})
export class CustomersListComponent implements OnInit {
  user = {} as User;
  token = '';

  customers = [];
  headers = ['Name', 'Email', 'Update', 'Delete'];
  loading = false;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store.select('user').subscribe((user) => {
      this.user = user;
    });

    this.store.select('token').subscribe((token) => {
      this.token = token;
    });

    if (!checkIfHasPermission(this.user, 'customers', 'read', false)) {
      this.router.navigate(['/home']);
      return;
    }

    this.loadCustomers();
  }

  loadCustomers() {
    getCustomers({ token: this.token })
      .then((data) => {
        const mappedCustomers = data.customers.map((customer: ICustomer) => [
          customer.name,
          customer.email,
          () => this.handleUpdateCustomer(customer._id as string),
          () =>
            this.handleDeleteCustomer(customer._id as string, customer.name),
        ]);

        this.customers = [...mappedCustomers];
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

  handleUpdateCustomer(id: string) {
    this.router.navigate([`/home/customers/${id}`]);
  }

  handleDeleteCustomer(id: string, name: string) {
    dispatchConfirmBox({
      title: 'Delete customer',
      message: `Are you sure you want to delete "${name}"?`,
      onConfirm: async (available = false) => {
        if (!available) return;

        try {
          await deleteCustomer({ id, token: this.token });

          dispatchAlert({
            message: `Customer "${name}" has been deleted`,
            type: 'success',
          });
        } catch (error) {
          dispatchAlert({
            message: (error as IError).response.data.message,
            type: 'error',
          });
        } finally {
          this.loadCustomers();
        }
      },
    });
  }
}
