import { formatDate } from "./utils.js";

const content = document.getElementById("data-content");

function safeText(value) {
  return value === undefined || value === null || value === ""
    ? "Não disponível"
    : String(value);
}

function createCard(title, values) {
  const card = document.createElement("div");
  card.className = "data-card";

  const h2 = document.createElement("h2");
  h2.className = "data-card-title";
  h2.textContent = title;
  card.appendChild(h2);

  if (Array.isArray(values)) {
    values.forEach((v) => {
      const p = document.createElement("p");
      p.className = "data-card-value";
      p.textContent = safeText(v);
      card.appendChild(p);
    });
  } else {
    const p = document.createElement("p");
    p.className = "data-card-value";
    p.style.whiteSpace = "pre-line";
    p.textContent = safeText(values);
    card.appendChild(p);
  }

  return card;
}

export default function buildDataContent(data) {
  if (!content) return;
  content.innerHTML = "";

  if (!data) {
    const p = document.createElement("p");
    p.textContent = "Dados não encontrados.";
    content.appendChild(p);
    return;
  }

  const est = data.estabelecimento || {};

  const razaoSocialCard = createCard("Razão Social", data.razao_social);

  const atvPrincipalCard = createCard(
    "Atividade Principal",
    est.atividade_principal?.descricao,
  );

  const atvSecundariasCard = createCard(
    "Atividades Secundárias",
    (est.atividades_secundarias || []).map((a) => a.descricao),
  );

  const enderecoParts = [
    est.logradouro,
    est.numero ? String(est.numero) : null,
    est.bairro,
    est.cidade?.nome,
  ].filter(Boolean);
  const enderecoText =
    `${enderecoParts.join(", ")} ${est.cep ? "\n" + est.cep : ""}`.trim();
  const enderecoCard = createCard("Endereço", enderecoText || "Não disponível");

  const emailCard = createCard("Email", est.email || "Não disponível");

  const sociosCard = createCard(
    "Sócios",
    (data.socios || []).map((s) => s.nome),
  );

  const inscricaoAtiva = (est.inscricoes_estaduais || []).find((i) => i.ativo);
  const inscricaoCard = createCard("Inscrição Estadual", [
    inscricaoAtiva?.inscricao_estadual || "Não disponível",
    inscricaoAtiva?.atualizado_em
      ? formatDate(inscricaoAtiva.atualizado_em)
      : "Não disponível",
  ]);

  content.appendChild(razaoSocialCard);
  content.appendChild(atvPrincipalCard);
  content.appendChild(atvSecundariasCard);
  content.appendChild(enderecoCard);
  content.appendChild(emailCard);
  content.appendChild(sociosCard);
  content.appendChild(inscricaoCard);
}
