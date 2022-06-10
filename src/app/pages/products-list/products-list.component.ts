import { Component, OnInit } from "@angular/core";
import User from "../../../models/User";
import { Store } from "@ngrx/store";
import { AppState } from "../../../stores/app.state";
import { Router } from "@angular/router";
import { checkIfHasPermission } from "../../../services/checkIfUserHasPermission";
import { dispatchAlert } from "../../../services/dispatchAlert";
import { IError } from "../../../interfaces/IError";
import { dispatchConfirmBox } from "../../../services/dispatchConfirmBox";
import { deleteProduct } from "../../../requests/products/deleteProduct";
import IProduct from "src/interfaces/IProduct";
import { getProducts } from "src/requests/products/getProducts";

@Component({
  selector: "app-products-list",
  templateUrl: "./products-list.component.html"
})
export class ProductsListComponent implements OnInit {
  user = {} as User;
  token = "";

  products = [];
  headers = ["Name", "Brand", "Category", "Update", "Delete"];
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

    if (!checkIfHasPermission(this.user, "products", "read", false)) {
      this.router.navigate(["/home"]);
      return;
    }

    this.loadProducts();
  }

  loadProducts() {
    getProducts({ token: this.token })
      .then((data) => {
        const mappedProducts = data.products.map((product: IProduct) => [
          product.name,
          product.brand,
          product.category?.name,
          () => this.handleUpdateUser(product._id as string),
          () => this.handleDeleteUser(product._id as string, product.name)
        ]);

        this.products = [...mappedProducts];
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

  handleUpdateUser(id: string) {
    this.router.navigate([`/home/products/form/${id}`]);
  }

  handleDeleteUser(id: string, name: string) {
    dispatchConfirmBox({
      title: "Delete product",
      message: `Are you sure you want to delete "${name}"?`,
      onConfirm: async (available = false) => {
        if (!available) return;

        try {
          await deleteProduct({ id, token: this.token });

          dispatchAlert({
            message: `Product "${name}" has been deleted`,
            type: "success"
          });
        } catch (error) {
          dispatchAlert({
            message: (error as IError).response.data.message,
            type: "error"
          });
        } finally {
          this.loadProducts();
        }
      }
    });
  }
}
