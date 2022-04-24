import { Component, OnInit } from '@angular/core';
import User from '../../models/User';
import { Store } from '@ngrx/store';
import { AppState } from '../../stores/app.state';
import useAuthentication from 'src/hooks/UseAuthentication';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  user = {} as User;
  token = '';

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store.select('user').subscribe((user) => {
      this.user = user;
    });

    this.store.select('token').subscribe((token) => {
      this.token = token;
    });

    useAuthentication(this.user, this.token, false).then(
      ({ user, token, route }) => {
        this.user = user;
        this.token = token;

        this.store.dispatch({
          type: 'SET_USER',
          payload: user,
        });
        this.store.dispatch({
          type: 'SET_TOKEN',
          payload: token,
        });

        if (route) {
          this.router.navigate([route]);
          return;
        }
      }
    );
  }
}
