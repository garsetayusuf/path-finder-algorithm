# Payment Routing System

This project is a **Payment Routing System** that uses Dijkstra's algorithm to find the cheapest path between banks for processing payments. It is built with **Node.js**, **Express**, and **TypeScript**, and includes Swagger documentation for API endpoints.

---

## Features

- Find the cheapest path between banks for payments in EUR or USD.
- Modular architecture with controllers, services, and repositories.
- Middleware for logging and error handling.
- Swagger documentation for API endpoints.

---

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (v18 or later)
- **npm** or **yarn**
- **Docker** (optional, for containerized deployment)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/garsetayusuf/path-finder-algorithm.git
   cd path-finder-algorithm
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env` and update the values as needed.
4. Run the application:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

---

## Usage

- The API documentation is available at `/api-docs` after starting the server.
- To find the cheapest payment route, send a POST request to `/api/payment/cheapest_path` with the required parameters.

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them.
4. Push to your forked repository.
5. Create a pull request describing your changes.

---

## Acknowledgements

- [Dijkstra's Algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) for pathfinding.
- [Express](https://expressjs.com/) for the web framework.
- [TypeScript](https://www.typescriptlang.org/) for static typing.
- [Swagger](https://swagger.io/) for API documentation.
