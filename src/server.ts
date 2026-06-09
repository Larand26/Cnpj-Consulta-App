import App from "./App.js";
import config from "./config/server.config.js";

const app = new App().server;

app.listen(config.port, () => {
  console.log(`Server is running in http://localhost:${config.port}`);
});
