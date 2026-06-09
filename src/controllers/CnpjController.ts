import CnpjService from "../services/CnpjService.js";
import type { Request, Response } from "express";

class CnpjController {
  static consultCnpj(req: Request, res: Response) {
    const { cnpj } = req.body;
    if (!cnpj) {
      return res
        .status(400)
        .json({ success: false, error: "CNPJ is required" });
    }
    const result = CnpjService.consultCnpj(cnpj);
    return res.json({ success: true, data: result });
  }
}

export default CnpjController;
