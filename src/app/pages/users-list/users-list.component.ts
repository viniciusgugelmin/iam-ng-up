import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../stores/app.state';
import { Router } from '@angular/router';
import User from '../../../models/User';
import { checkIfHasPermission } from '../../../services/checkIfUserHasPermission';
import { getUsers } from 'src/requests/users/getUsers';
import IUser from '../../../interfaces/IUser';
import { deleteUser } from '../../../requests/users/deleteUser';
import { dispatchAlert } from 'src/services/dispatchAlert';
import { IError } from '../../../interfaces/IError';
import { dispatchConfirmBox } from 'src/services/dispatchConfirmBox';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
})
export class UsersListComponent implements OnInit {
  user = {} as User;
  token = '';

  users = [];
  headers = ['Name', 'Email', 'Role', 'Update', 'Delete'];
  loading = false;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store.select('user').subscribe((user) => {
      this.user = user;
    });

    this.store.select('token').subscribe((token) => {
      this.token = token;
    });

    if (!checkIfHasPermission(this.user, 'users', 'read', false)) {
      this.router.navigate(['/home']);
      return;
    }

    this.loadUsers();
  }

  loadUsers() {
    getUsers({ token: this.token })
      .then((data) => {
        const mappedUsers = data.users.map((user: IUser) => [
          user.name,
          user.email,
          user.role.name,
          () => this.handleUpdateUser(user._id as string),
          () => this.handleDeleteUser(user._id as string, user.name),
        ]);

        this.users = [...mappedUsers];
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

  handleUpdateUser(id: string) {
    this.router.navigate([`/home/users/form/${id}`]);
  }

  handleDeleteUser(id: string, name: string) {
    dispatchConfirmBox({
      title: 'Delete user',
      message: `Are you sure you want to delete "${name}"?`,
      onConfirm: async (available = false) => {
        if (!available) return;

        try {
          await deleteUser({ id, token: this.token });

          dispatchAlert({
            message: `User "${name}" has been deleted`,
            type: 'success',
          });
        } catch (error) {
          dispatchAlert({
            message: (error as IError).response.data.message,
            type: 'error',
          });
        } finally {
          this.loadUsers();
        }
      },
    });
  }
}
