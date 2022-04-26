import { Component, OnInit } from '@angular/core';
import genders from '../../../constants/users/genders';
import User from '../../../models/User';
import { checkIfHasPermission } from '../../../services/checkIfUserHasPermission';
import { Store } from '@ngrx/store';
import { AppState } from '../../../stores/app.state';
import { ActivatedRoute, Router } from '@angular/router';
import { dispatchAlert } from '../../../services/dispatchAlert';
import { IError } from '../../../interfaces/IError';
import { getRoles } from 'src/requests/roles/getRoles';
import { postUser } from '../../../requests/users/postUser';
import { getUser } from '../../../requests/users/getUser';
import { putUser } from '../../../requests/users/putUser';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
})
export class UsersFormComponent implements OnInit {
  user = {} as User;
  token = '';

  title = 'Create user';
  type = 'create';
  disabled = true;
  loading = false;
  roles = [];
  gendersArray = [['', ''], ...genders.map((gender) => [gender, gender])];
  isRoleFocused = false;
  isDocumentFocused = false;
  isNameFocused = false;
  isEmailFocused = false;
  isPasswordFocused = false;
  isGenderFocused = false;
  isHiredAtFocused = false;

  private _role = '';
  private _document = '';
  private _documentTreated = '';
  private _name = '';
  private _email = '';
  private _password = '';
  private _gender = '';
  private _hiredAt = '';
  private _hiredAtTreated = '';

  set role(value: string) {
    this._role = value;
    this.checkAllFieldsAreFilled();
  }

  get role(): string {
    return this._role;
  }

  set document(value: string) {
    this._document = value;
    this.checkAllFieldsAreFilled();
  }

  get document(): string {
    return this._document;
  }

  get hiredAtTreated(): string {
    return this._hiredAtTreated;
  }

  set hiredAtTreated(value: string) {
    const dateToInsert = value.replace(/[^0-9]/g, '').slice(0, 8);

    this._hiredAt = dateToInsert;
    this._hiredAtTreated = dateToInsert
      .split('')
      .map((char, index) => {
        if (index === 2 || index === 4) {
          return `/${char}`;
        } else if (index === 8) {
          return `/${char}`;
        } else {
          return char;
        }
      })
      .join('');
    this.checkAllFieldsAreFilled();

    // @ts-ignore
    document.getElementById('hiredAt')?.value = this._hiredAtTreated;
  }

  get hiredAt(): string {
    return this._hiredAt;
  }

  set hiredAt(value: string) {
    this._hiredAt = value;
    this.checkAllFieldsAreFilled();
  }

  get gender(): string {
    return this._gender;
  }

  set gender(value: string) {
    this._gender = value;
    this.checkAllFieldsAreFilled();
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
    this.checkAllFieldsAreFilled();
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
    this.checkAllFieldsAreFilled();
  }

  set name(value: string) {
    this._name = value;
    this.checkAllFieldsAreFilled();
  }

  get name(): string {
    return this._name;
  }

  get documentTreated(): string {
    return this._documentTreated;
  }

  set documentTreated(value: string) {
    const documentToInsert = value.replace(/[^0-9]/g, '').slice(0, 11);

    this._document = documentToInsert;
    this._documentTreated = documentToInsert
      .split('')
      .map((char, index) => {
        if (index === 3 || index === 6) {
          return `.${char}`;
        } else if (index === 9) {
          return `-${char}`;
        } else {
          return char;
        }
      })
      .join('');
    // @ts-ignore
    document.getElementById('document')?.value = this._documentTreated;
  }

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.select('user').subscribe((user) => {
      this.user = user;
    });

    this.store.select('token').subscribe((token) => {
      this.token = token;
    });

    if (!checkIfHasPermission(this.user, 'users', 'create', false)) {
      this.router.navigate(['/home']);
      return;
    }

    this.loadRoles();

    if (!this.route.snapshot.params.userId) return;

    if (!checkIfHasPermission(this.user, 'users', 'update', false)) {
      this.router.navigate(['/home']);
      return;
    }

    this.title = 'Update user';
    this.type = 'update';
    this.loadUser(this.route.snapshot.params.userId);
  }

  loadRoles() {
    this.loading = true;

    getRoles({ token: this.token })
      .then((data) => {
        this.roles = [
          ['', ''],
          ...data.roles.map((role: { name: string }) => [role.name, role.name]),
        ];
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

  loadUser(userId: string) {
    this.loading = true;

    getUser({ token: this.token, id: userId }).then(({ user }) => {
      this.role = user.role.name;
      this.documentTreated = user.document;
      this.name = user.name;
      this.email = user.email;
      this.gender = user._gender;

      const _hiredDate = new Date(user._hiredAt);
      const _hiredDateTreated = _hiredDate.toJSON().slice(0, 10);

      this.hiredAtTreated = _hiredDateTreated.replace(
        /^(\d{4})-(\d{1,2})-(\d{1,2})$/,
        '$3/$2/$1'
      );
    });
  }

  checkAllFieldsAreFilled() {
    this.disabled = !(
      this.role &&
      this.document &&
      this.documentTreated &&
      this.name &&
      this.email &&
      this.gender &&
      this.hiredAt &&
      this.hiredAtTreated
    );
  }

  async createUser() {
    if (this.disabled || this.loading) return;

    this.loading = true;

    try {
      await postUser({
        token: this.token,
        user: {
          role: this.role,
          document: this.document,
          name: this.name,
          email: this.email,
          password: this.password,
          gender: this.gender,
          hiredAt: this.hiredAtTreated,
        },
      });

      dispatchAlert({
        message: 'User created successful',
        type: 'success',
      });

      this.router.navigate(['/home/users/list']);
    } catch (error) {
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
    } finally {
      this.loading = false;
    }
  }

  async updateUser() {
    if (this.disabled || this.loading) return;

    this.loading = true;

    try {
      await putUser({
        token: this.token,
        user: {
          role: this.role,
          document: this.document,
          name: this.name,
          email: this.email,
          password: this.password,
          gender: this.gender,
          hiredAt: this.hiredAtTreated,
        },
        id: this.route.snapshot.params.userId,
      });

      dispatchAlert({
        message: 'User updated successful',
        type: 'success',
      });

      this.router.navigate(['/home/users/list']);
    } catch (error) {
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
    } finally {
      this.loading = false;
    }
  }
}
