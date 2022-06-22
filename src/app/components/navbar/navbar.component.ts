import { Component, OnInit, ViewChild } from '@angular/core';
import { AppState, logout } from '../../../stores/app.state';
import { Store } from '@ngrx/store';
import { NavigationEnd, Router } from '@angular/router';
import { checkIfHasPermission } from '../../../services/checkIfUserHasPermission';
import User from '../../../models/User';

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

    const returnNavbarOptions = () => [
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
        name: 'Products',
        isActive: this.checkIfOptionInitActive('products', [
          'categories',
          'products-for-sale',
        ]),
        options: [
          {
            name: 'List',
            route: 'products/list',
            blocked: !checkIfHasPermission(
              this.user,
              'products',
              'read',
              false
            ),
            isActive: this.checkIfSubOptionInitActive('products/list'),
          },
          {
            name: 'Form',
            route: 'products/form',
            blocked: !checkIfHasPermission(
              this.user,
              'products',
              'create',
              false
            ),
            isActive: this.checkIfSubOptionInitActive('products/form'),
          },
        ],
      },
      {
        name: 'Categories',
        isActive: this.checkIfOptionInitActive('products/categories'),
        options: [
          {
            name: 'List',
            route: 'products/categories/list',
            blocked: !checkIfHasPermission(
              this.user,
              'products_categories',
              'read',
              false
            ),
            isActive: this.checkIfSubOptionInitActive(
              'products/categories/list'
            ),
          },
          {
            name: 'Form',
            route: 'products/categories/form',
            blocked: !checkIfHasPermission(
              this.user,
              'products_categories',
              'create',
              false
            ),
            isActive: this.checkIfSubOptionInitActive(
              'products/categories/form'
            ),
          },
        ],
      },
      {
        name: 'Storage',
        isActive: this.checkIfOptionInitActive('storage'),
        options: [
          {
            name: 'List',
            route: 'storage/list',
            blocked: !checkIfHasPermission(this.user, 'storage', 'read', false),
            isActive: this.checkIfSubOptionInitActive('storage/list'),
          },
        ],
      },
      {
        name: 'Entries',
        isActive: this.checkIfOptionInitActive('entries'),
        options: [
          {
            name: 'List',
            route: 'entries/list',
            blocked: !checkIfHasPermission(this.user, 'entries', 'read', false),
            isActive: this.checkIfSubOptionInitActive('entries/list'),
          },
          {
            name: 'Form',
            route: 'entries/form',
            blocked: !checkIfHasPermission(
              this.user,
              'entries',
              'create',
              false
            ),
            isActive: this.checkIfSubOptionInitActive('entries/form'),
          },
        ],
      },
      {
        name: 'Products for sale',
        isActive: this.checkIfOptionInitActive('products-for-sale'),
        options: [
          {
            name: 'List',
            route: 'products-for-sale/list',
            isActive: this.checkIfSubOptionInitActive('products-for-sale/list'),
          },
          {
            name: 'Form',
            route: 'products-for-sale/form',
            blocked: !checkIfHasPermission(
              this.user,
              'products_for_sale',
              'create',
              false
            ),
            isActive: this.checkIfSubOptionInitActive('products-for-sale/form'),
          },
        ],
      },
      {
        name: 'Customers',
        isActive: this.checkIfOptionInitActive('customers'),
        options: [
          {
            name: 'List',
            route: 'customers/list',
            blocked: !checkIfHasPermission(
              this.user,
              'customers',
              'read',
              false
            ),
            isActive: this.checkIfSubOptionInitActive('customers/list'),
          },
          {
            name: 'Form',
            route: 'customers/form',
            blocked: !checkIfHasPermission(
              this.user,
              'customers',
              'create',
              false
            ),
            isActive: this.checkIfSubOptionInitActive('customers/form'),
          },
        ],
      },
      {
        name: 'Sales',
        isActive: this.checkIfOptionInitActive('sales'),
        options: [
          {
            name: 'List',
            route: 'sales/list',
            blocked: !checkIfHasPermission(this.user, 'sales', 'read', false),
            isActive: this.checkIfSubOptionInitActive('sales/list'),
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

    this.navbarOptions = returnNavbarOptions();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.navbarOptions = returnNavbarOptions();
      }
    });
  }

  checkIfOptionInitActive(option: string, ignoreItems: string[] = []) {
    const routeCheck = this.router.url.startsWith(
      `/home/${option.toLowerCase()}`
    );

    if (ignoreItems.length > 0) {
      return (
        routeCheck &&
        !ignoreItems.find((item) => this.router.url.includes(item))
      );
    }

    return routeCheck;
  }

  checkIfSubOptionInitActive(subOption: string) {
    return this.router.url.startsWith(`/home/${subOption.toLowerCase()}`);
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
