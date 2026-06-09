import { Router } from "express";
import type { Request, Response } from "express";
import fs from "fs";
import path from "path";

const routes = Router();

import CnpjController from "../controllers/CnpjController.js";

routes.get("/", (req: Request, res: Response) => {
  const html = fs.readFileSync(
    path.join(process.cwd(), "public/index.html"),
    "utf-8",
  );
  res.send(html);
});

routes.post("/cnpj-consult", async (req: Request, res: Response) => {
  await CnpjController.consultCnpj(req, res);
});

export default routes;
