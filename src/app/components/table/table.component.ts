import { Component, Input, OnInit } from '@angular/core';
import IUser from '../../../interfaces/IUser';
import { checkIfHasPermission } from '../../../services/checkIfUserHasPermission';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit {
  @Input() title: string;
  @Input() headers: string[];
  @Input() data: [][];
  @Input() isLoading: boolean;
  @Input() user: IUser;

  constructor() {}

  ngOnInit(): void {}

  prepareHeader(header: string) {
    return header
      .replace(/^_/, '')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  }

  copyToClipboard(text: string) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  checkIfUserIsBlockedToChange(header: string) {
    return (
      (header === 'Update' &&
        !checkIfHasPermission(this.user, 'users', 'update', false)) ||
      (header === 'Delete' &&
        !checkIfHasPermission(this.user, 'users', 'delete', false))
    );
  }

  returnCellTypeof(cell: any) {
    return typeof cell;
  }
}
