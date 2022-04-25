import { Component, OnInit } from '@angular/core';
import useAuthentication from '../../../hooks/UseAuthentication';
import User from '../../../models/User';
import { Store } from '@ngrx/store';
import { AppState } from '../../../stores/app.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-logged',
  templateUrl: './home-logged.component.html',
})
export class HomeLoggedComponent implements OnInit {
  user = {} as User;
  token = '';

  pageLoaded = false;

  constructor(private store: Store<AppState>, private router: Router) {
  }

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

        if (!user) {
          this.router.navigate([route]);
          return;
        }

        this.pageLoaded = true;
      }
    );
  }
}
