import Utils from "../utils/Utils.js";
import axios from "axios";
const url = "https://publica.cnpj.ws/cnpj";

class CnpjService {
  static async consultCnpj(
    cnpj: string,
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    // normaliza o CNPJ removendo caracteres não numéricos
    const normalizedCnpj = Utils.normalizeCnpj(cnpj);

    if (normalizedCnpj.length !== 14) {
      return { success: false, error: "Invalid CNPJ format" };
    }

    try {
      const response = await axios.get(`${url}/${normalizedCnpj}`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

export default CnpjService;
