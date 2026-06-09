import CnpjService from "../services/CnpjService.js";
import type { Request, Response } from "express";

class CnpjController {
  static async consultCnpj(req: Request, res: Response) {
    const { cnpj } = req.body;
    if (!cnpj) {
      return res
        .status(400)
        .json({ success: false, error: "CNPJ is required" });
    }
    const result = await CnpjService.consultCnpj(cnpj);
    if (result.success) {
      return res.json(result);
    }
    return res.status(404).json(result);
  }
}

export default CnpjController;
