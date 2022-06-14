import { Component, OnInit } from "@angular/core";
import User from "../../../models/User";
import { Store } from "@ngrx/store";
import { AppState } from "../../../stores/app.state";
import { Router } from "@angular/router";
import { checkIfHasPermission } from "../../../services/checkIfUserHasPermission";
import { dispatchAlert } from "../../../services/dispatchAlert";
import { IError } from "../../../interfaces/IError";
import IProductsCategory from "../../../interfaces/IProductsCategory";
import { dispatchConfirmBox } from "../../../services/dispatchConfirmBox";
import { deleteProductsCategory } from "../../../requests/productsCategories/deleteProductsCategory";
import { getProductsCategories } from "../../../requests/productsCategories/getProductsCategories";

@Component({
  selector: "app-categories-list",
  templateUrl: "./categories-list.component.html"
})
export class CategoriesListComponent implements OnInit {
  user = {} as User;
  token = "";

  categories = [];
  headers = ["Name", "Update", "Delete"];
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

    if (!checkIfHasPermission(this.user, "product_categories", "read", false)) {
      this.router.navigate(["/home"]);
      return;
    }

    this.loadProductsCategories();
  }

  loadProductsCategories() {
    getProductsCategories({ token: this.token })
      .then((data) => {
        const mappedCateogories = data.productsCategories.map((category: IProductsCategory) => [
          category.name,
          () => this.handleUpdateCategory(category._id as string),
          () => this.handleDeleteCategory(category._id as string, category.name)
        ]);

        this.categories = [...mappedCateogories];
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

  handleUpdateCategory(id: string) {
    this.router.navigate([`/home/products/categories/form/${id}`]);
  }

  handleDeleteCategory(id: string, name: string) {
    dispatchConfirmBox({
      title: "Delete products category",
      message: `Are you sure you want to delete "${name}"?`,
      onConfirm: async (available = false) => {
        if (!available) return;

        try {
          await deleteProductsCategory({ id, token: this.token });

          dispatchAlert({
            message: `Products category "${name}" has been deleted`,
            type: "success"
          });
        } catch (error) {
          dispatchAlert({
            message: (error as IError).response.data.message,
            type: "error"
          });
        } finally {
          this.loadProductsCategories();
        }
      }
    });
  }
}
