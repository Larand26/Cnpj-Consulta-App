class Utils {
  static normalizeCnpj(cnpj: string): string {
    return cnpj.replace(/\D/g, "");
  }
}

export default Utils;
