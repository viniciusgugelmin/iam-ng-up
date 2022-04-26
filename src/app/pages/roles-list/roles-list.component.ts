import { Component, OnInit } from '@angular/core';
import User from '../../../models/User';
import { Store } from '@ngrx/store';
import { AppState } from '../../../stores/app.state';
import { Router } from '@angular/router';
import { checkIfHasPermission } from '../../../services/checkIfUserHasPermission';
import { dispatchAlert } from '../../../services/dispatchAlert';
import { IError } from '../../../interfaces/IError';
import { getRoles } from '../../../requests/roles/getRoles';
import IRole from '../../../interfaces/IRole';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
})
export class RolesListComponent implements OnInit {
  user = {} as User;
  token = '';

  roles = [];
  headers = ['Name'];
  loading = false;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store.select('user').subscribe((user) => {
      this.user = user;
    });

    this.store.select('token').subscribe((token) => {
      this.token = token;
    });

    if (!checkIfHasPermission(this.user, 'roles', 'read', false)) {
      this.router.navigate(['/home']);
      return;
    }

    this.loadRoles();
  }

  loadRoles() {
    getRoles({ token: this.token })
      .then((data) => {
        const mappedRoles = data.roles.map((role: IRole) => [role.name]);

        this.roles = [...mappedRoles];
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
}
