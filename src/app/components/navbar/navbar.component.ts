import { Component, OnInit } from '@angular/core';
import { AppState, logout } from '../../../stores/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { checkIfHasPermission } from '../../../services/checkIfUserHasPermission';
import User from '../../../models/User';
import useAuthentication from '../../../hooks/UseAuthentication';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  user = {} as User;
  token = '';

  navbarOptions = [];

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store.select('user').subscribe((user) => {
      this.user = user;
    });

    this.store.select('token').subscribe((token) => {
      this.token = token;
    });

    this.navbarOptions = [
      {
        name: 'Users',
        isActive: this.checkIfOptionInitActive('users'),
        options: [
          {
            name: 'List',
            route: 'users/list',
            blocked: !checkIfHasPermission(this.user, 'users', 'read', false),
            isActive: this.checkIfOptionInitActive('users/list'),
          },
          {
            name: 'Form',
            route: 'users/form',
            blocked: !checkIfHasPermission(this.user, 'users', 'create', false),
            isActive: this.checkIfOptionInitActive('users/form'),
          },
        ],
      },
      {
        name: 'Roles',
        isActive: this.checkIfOptionInitActive('roles'),
        options: [
          {
            name: 'List',
            route: 'roles/list',
            blocked: !checkIfHasPermission(this.user, 'roles', 'read', false),
            isActive: this.checkIfOptionInitActive('roles/list'),
          },
        ],
      },
      {
        name: 'Logout',
        action: () => this.logout(),
        isActive: this.checkIfOptionInitActive('logout'),
        options: [],
      },
    ];
  }

  checkIfOptionInitActive(option: string) {
    return this.router.url.startsWith(`/home/${option.toLowerCase()}`);
  }

  handleSubOptionClick(optionIndex: number, subOptionIndex: number) {
    this.navbarOptions = this.navbarOptions.map((item, itemIndex) => {
      item.options?.map((subItem, subItemIndex) => {
        if (subItem.blocked) {
          return subItem;
        }

        if (itemIndex === optionIndex && subItemIndex === subOptionIndex) {
          subItem.isActive = true;
          this.router.navigate([`/home/${subItem.route}`]);
          return subItem;
        }

        subItem.isActive = false;
        return subItem;
      });

      return item;
    });
  }

  handleOptionClick(titleIndex: number) {
    this.navbarOptions = this.navbarOptions.map((item, itemIndex) => {
      if (itemIndex === titleIndex) {
        item.isActive = !item.isActive;

        if (item.options.length === 0 && item.action) {
          item.action();
        }

        return item;
      }

      item.isActive = false;
      return item;
    });
  }

  logout() {
    const logoutResponse = logout();

    this.store.dispatch({
      type: 'DELETE_USER',
    });
    this.store.dispatch({
      type: 'DELETE_TOKEN',
    });

    this.router.navigate([logoutResponse.route]);
  }
}
