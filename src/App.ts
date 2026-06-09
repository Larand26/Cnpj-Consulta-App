import express from "express";
import routes from "./routes/index.js";

class App {
  server: express.Express;
  constructor() {
    this.server = express();
    this.routes();
  }

  routes() {
    this.server.use(routes);
  }
}

export default App;
