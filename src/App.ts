import express from "express";
import path from "path"; // Importe o path
import routes from "./routes/index.js";

class App {
  server: express.Express;

  constructor() {
    this.server = express();
    this.middlewares(); // Chame os middlewares antes das rotas!
    this.routes();
  }

  middlewares() {
    this.server.use(express.static(path.join(process.cwd(), "public")));
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.server.use(routes);
  }
}

export default App;
