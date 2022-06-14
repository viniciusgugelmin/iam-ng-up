import { Component, OnInit } from "@angular/core";
import User from "../../../models/User";
import { Store } from "@ngrx/store";
import { AppState } from "../../../stores/app.state";
import { Router } from "@angular/router";
import { checkIfHasPermission } from "../../../services/checkIfUserHasPermission";
import { getRoles } from "../../../requests/roles/getRoles";
import IRole from "../../../interfaces/IRole";
import { dispatchAlert } from "../../../services/dispatchAlert";
import { IError } from "../../../interfaces/IError";
import { getAllStorage } from "../../../requests/storage/getAllStorage";
import IStorage from "../../../interfaces/IStorage";

@Component({
  selector: "app-storage-list",
  templateUrl: "./storage-list.component.html"
})
export class StorageListComponent implements OnInit {
  user = {} as User;
  token = "";

  storage = [];
  headers = ["Product Id", "Product Name", "Liters"];
  loading = false;

  constructor(private store: Store<AppState>, private router: Router) {
  }

  ngOnInit(): void {
    this.store.select("user").subscribe((user) => {
      this.user = user;
    });

    this.store.select("token").subscribe((token) => {
      this.token = token;
    });

    if (!checkIfHasPermission(this.user, "storage", "read", false)) {
      this.router.navigate(["/home"]);
      return;
    }

    this.loadStorage();
  }

  loadStorage() {
    getAllStorage({ token: this.token })
      .then((data) => {
        const mappedProducts = data.products.map((productStorage: IStorage) => [productStorage.productId, productStorage.product?.name || "", this.formatLiters(productStorage.liters)]);

        this.storage = [...mappedProducts];
      })
      .catch((error) => {
        if (!error.response?.data) {
          dispatchAlert({
            message: "Server error",
            type: "error"
          });
        } else {
          dispatchAlert({
            message: (error as IError).response.data.message,
            type: "error"
          });
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }

  formatLiters(value: number): string {
    return Intl.NumberFormat("pt-BR", {
      style: "decimal"
    }).format(value);
  }
}
