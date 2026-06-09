import { Router } from "express";
import type { Request, Response } from "express";

const routes = Router();

import CnpjController from "../controllers/CnpjController.js";

routes.get("/", (req: Request, res: Response) => {
  res.send("Hello from the routes!");
});

routes.post("/cnpj-consult", async (req: Request, res: Response) => {
  await CnpjController.consultCnpj(req, res);
});

export default routes;
