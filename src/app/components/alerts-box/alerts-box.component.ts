import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerts-box',
  templateUrl: './alerts-box.component.html',
})
export class AlertsBoxComponent implements OnInit {
  alerts = [];

  constructor() {}

  ngOnInit(): void {
    window.addEventListener('up-alert', (e: any) => {
      this.addAlert(e.detail);
    });
  }

  addAlert({
    message,
    type = 'common',
    timeout = 5000,
  }: {
    message: string;
    type: string;
    timeout: number;
  }) {
    if (!['success', 'error', 'common'].includes(type)) {
      type = 'common';
    }

    const newAlert = {
      id: Date.now(),
      type,
      message,
    };

    this.alerts = [newAlert, ...this.alerts];

    setTimeout(() => {
      this.removeAlert(newAlert.id);
    }, timeout);
  }

  removeAlert(id: number) {
    this.alerts = [...this.alerts.filter((alert) => alert.id !== id)];
  }
}
