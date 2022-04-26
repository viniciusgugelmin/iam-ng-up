import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
})
export class ConfirmBoxComponent implements OnInit {
  show = false;
  title = '';
  message = '';
  onConfirm = null;
  onCancel = null;
  loading = false;

  constructor() {}

  ngOnInit(): void {
    window.addEventListener('up-confirm-box', (e: any) => {
      this.title = e.detail.title;
      this.message = e.detail.message;
      this.onConfirm = (value) => e.detail.onConfirm(value);
      this.onCancel = (value) => e.detail.onCancel(value);
      this.show = true;
    });
  }

  async handleConfirm() {
    this.loading = true;

    if (typeof this.onConfirm === 'function') {
      await this.onConfirm(true);
    }

    this.show = false;
    this.loading = false;
  }

  async handleCancel() {
    this.loading = true;

    if (typeof this.onCancel === 'function') {
      await this.onCancel(true);
    }

    this.show = false;
    this.loading = false;
  }
}
