import { Component, OnInit } from "@angular/core";
import User from "../../../models/User";
import { Store } from "@ngrx/store";
import { AppState } from "../../../stores/app.state";
import { Router } from "@angular/router";
import { checkIfHasPermission } from "../../../services/checkIfUserHasPermission";
import { getProductsCategories } from "../../../requests/productsCategories/getProductsCategories";
import IProductsCategory from "../../../interfaces/IProductsCategory";
import { dispatchAlert } from "../../../services/dispatchAlert";
import { IError } from "../../../interfaces/IError";
import { dispatchConfirmBox } from "../../../services/dispatchConfirmBox";
import { deleteProductsCategory } from "../../../requests/productsCategories/deleteProductsCategory";
import { getEntries } from "../../../requests/entries/getEntries";
import IEntry from "../../../interfaces/IEntry";
import { deleteEntry } from "src/requests/entries/deleteEntry";

@Component({
  selector: "app-entries-list",
  templateUrl: "./entries-list.component.html"
})
export class EntriesListComponent implements OnInit {
  user = {} as User;
  token = "";

  entries = [];
  headers = [
    "Product Id",
    "Product name",
    "Price",
    "Liters",
    "Created at",
    "Delete"
  ];
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

    if (!checkIfHasPermission(this.user, "entries", "read", false)) {
      this.router.navigate(["/home"]);
      return;
    }

    this.loadEntries();
  }

  loadEntries() {
    getEntries({ token: this.token })
      .then((data) => {
        const mappedEntries = data.entries.map((entry: IEntry) => [
          entry.productId,
          entry.product?.name || "",
          this.formatReal(entry.price),
          this.formatLiters(entry.liters),
          // @ts-ignore
          this.formatDate(entry._createdAt),
          () =>
            this.handleDeleteEntry(
              entry._id as string,
              entry.product?.name as string
            )
        ]);

        this.entries = [...mappedEntries];
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

  formatReal(value: number): string {
    return Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value);
  }

  formatLiters(value: number): string {
    return Intl.NumberFormat("pt-BR", {
      style: "decimal"
    }).format(value);
  }

  formatDate(date: Date) {
    return new Date(date).toLocaleString();
  }

  handleDeleteEntry(id: string, name: string) {
    dispatchConfirmBox({
      title: "Delete entry",
      message: `Are you sure you want to delete "${name}"?`,
      onConfirm: async (available = false) => {
        if (!available) return;

        try {
          await deleteEntry({ id, token: this.token });

          dispatchAlert({
            message: `Entry "${name}" has been deleted`,
            type: "success"
          });
        } catch (error) {
          dispatchAlert({
            message: (error as IError).response.data.message,
            type: "error"
          });
        } finally {
          this.loadEntries();
        }
      }
    });
  }
}
