import Utils from "../utils/Utils.js";

class CnpjService {
  static consultCnpj(cnpj: string) {
    // normaliza o CNPJ removendo caracteres não numéricos
    const normalizedCnpj = Utils.normalizeCnpj(cnpj);
  }
}

export default CnpjService;
