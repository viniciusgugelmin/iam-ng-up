import { Component, OnInit } from '@angular/core';
import { login } from '../../../stores/app.state';

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
})
export class HomeLoginComponent implements OnInit {
  disabled = true;
  loading = false;
  isPasswordFocused = false;
  isEmailFocused = false;

  _email = '';
  _password = '';

  set email(value: string) {
    this._email = value;
    this.disabled = !this._email || !this._password;
  }

  get email() {
    return this._email;
  }

  set password(value: string) {
    this._password = value;
    this.disabled = !this._email || !this._password;
  }

  get password() {
    return this._password;
  }

  async login() {
    if ((!this.email || !this.password) && !this.loading) {
      return;
    }

    this.loading = true;

    try {
      const loginResponse = await login({
        email: this.email,
        password: this.password,
      });
    } catch (error) {
      this.loading = false;
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
