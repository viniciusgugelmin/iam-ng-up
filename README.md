<p align="center">
  <a href="https://github.com/viniciusgugelmin/iam-ng-up">
    <img src="info/readme.png" alt="readme-logo" width="80" height="80">
  </a>

  <h3 align="center">
    iam-ng-up
  </h3>
  <p align="center">
    Identity Access Management in Angular - UP
    <br />
    <a href="https://github.com/viniciusgugelmin/iam-ng-up"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/viniciusgugelmin/iam-ng-up/issues">Report Bug</a>
    ·
    <a href="https://github.com/viniciusgugelmin/iam-ng-up/issues">Request Feature</a>
  </p>
</p>

<details open="open">
  <summary><h2 style="display: inline-block">Abstract</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

Web application to manage users access to the system.

![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## Roadmap

See the [open issues](https://github.com/viniciusgugelmin/iam-ng-up/issues) for a list of proposed features (and known
issues).

### Usage

```
$ git clone https://github.com/viniciusgugelmin/iam-ng-up

$ cd iam-ng-up

$ yarn install

$ yarn run dev
```

Create a `env.ts` file with the following content:

```ts
export const env = {
  APP_NAME: 'Go Drink',
  API_URL: 'http://localhost:3000/api',
};
```

Routes:

```
- /
  - Base route to select to login or register
- /login
  - Route to login
- /signup
  - Route to register
- /home
  - Logged in base route
- /home/users/list
  - Route to list all users
- /home/users/form
  - Route to create a new user
- /home/users/form/:userId
  - Route to update a user by id
- /home/roles/list
  - Route to list all roles
- /home/products/list
  - Route to list all products
- /home/products/form
  - Route to create a new product
- /home/products/form/:productId
  - Route to update a product by id
- /home/products/categories/list
  - Route to list all categories
- /home/products/categories/form
  - Route to create a new category
- /home/products/categories/form/:categoryId
  - Route to update a category by id
- /home/storage/list
  - Route to list all storage
- /home/entries/list
  - Route to list all entries
- /home/entries/form
  - Route to create a new entry and add it to the storage
- /home/products-for-sale/list
  - Route to list all products for sale
- /home/products-for-sale/form
  - Route to create a new product for sale
- /home/customers/list
  - Route to list all customers
- /home/customers/form
  - Route to create a new customer
- /home/customers/form/:customerId
  - Route to update a customer by id
- /home/sales/list
  - Route to list all sales
- /app
  - Route to select product
```

This project is using
the [https://github.com/viniciusgugelmin/iam-next-up](https://github.com/viniciusgugelmin/iam-next-up)
project back end.

## Contributing

Any contributions you make are **greatly appreciated**.

1. Clone the Project
2. Create your Feature Branch (`git checkout -b feature/<featureName>`)
3. Commit your Changes (`git commit -m '<Description of the feature added>'`)
4. Push to the Branch (`git push origin feature/<featureName>`)
5. Open a Pull Request

## Contact

Vinícius Kruchelski Gugelmin - vinigugelmin@gmail.com

Lucas Rodrigues Leite

Gabriel Zanin

Carlos Neres

Project Link: [https://github.com/viniciusgugelmin/iam-ng-up](https://github.com/viniciusgugelmin/iam-ng-up)
