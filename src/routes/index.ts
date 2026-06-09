import { Router } from "express";
import type { Request, Response } from "express";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.send("Hello from the routes!");
});

export default routes;
