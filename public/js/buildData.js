import { formatDate } from "./utils.js";

const content = document.getElementById("data-content");
function buildData(data) {
  return `
    <div class="data-card">
            <h2 class="data-card-title">${data.title}</h2>
            <p class="data-card-value">${data.value}</p>
          </div>
    `;
}
function buildDataArray(dataArray) {
  const values = dataArray.values
    .map((value) => `<p class="data-card-value">${value}</p>`)
    .join("");
  return `
    <div class="data-card">
            <h2 class="data-card-title">${dataArray.title}</h2>
            ${values}
          </div>
    `;
}

export default function buildDataContent(data) {
  content.innerHTML = "";
  if (!data) {
    content.innerHTML = "<p>Dados não encontrados.</p>";
    return;
  }
  console.log("Construindo conteúdo com os dados:", data);
  const razaoSocial = buildData({
    title: "Razão Social",
    value: data.razao_social,
  });
  const atvPrincipal = buildData({
    title: "Atividade Principal",
    value: data.estabelecimento.atividade_principal.descricao,
  });
  const atvSecundarias = buildDataArray({
    title: "Atividades Secundárias",
    values: data.estabelecimento.atividades_secundarias.map(
      (atv) => atv.descricao,
    ),
  });
  const endereco = buildData({
    title: "Endereço",
    value: `${data.estabelecimento.logradouro}, ${data.estabelecimento.numero} - ${data.estabelecimento.bairro}, ${data.estabelecimento.cidade.nome} \n ${data.estabelecimento.cep}`,
  });
  const email = buildData({
    title: "Email",
    value: data.estabelecimento.email || "Não disponível",
  });
  const socios = buildDataArray({
    title: "Sócios",
    values: data.socios.map((socio) => socio.nome),
  });
  const inscricaoEstadual = buildDataArray({
    title: "Inscrição Estadual",
    values: [
      data.estabelecimento.inscricoes_estaduais.find((i) => i.ativo)
        ?.inscricao_estadual || "Não disponível",
      formatDate(
        data.estabelecimento.inscricoes_estaduais.find((i) => i.ativo)
          ?.atualizado_em,
      ) || "Não disponível",
    ],
  });

  content.innerHTML =
    razaoSocial +
    atvPrincipal +
    atvSecundarias +
    endereco +
    email +
    socios +
    inscricaoEstadual;
}
