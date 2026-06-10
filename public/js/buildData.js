import { formatDate } from "./utils.js";
import buildFilters from "./buildFilters.js";

const content = document.getElementById("data-content");

function safeText(value) {
  return value === undefined || value === null || value === ""
    ? "Não disponível"
    : String(value);
}

function keyFromTitle(title) {
  return title.toLowerCase().replace(/\s+/g, "-");
}

function createCard(title, values) {
  const card = document.createElement("div");
  card.className = "data-card";
  card.dataset.key = keyFromTitle(title);

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

function buildSections(data) {
  const est = data.estabelecimento || {};
  const enderecoParts = [
    est.logradouro,
    est.numero ? String(est.numero) : null,
    est.bairro,
    est.cidade?.nome,
  ].filter(Boolean);
  const enderecoText =
    `${enderecoParts.join(", ")} ${est.cep ? "\n" + est.cep : ""}`.trim();
  const inscricaoAtiva = (est.inscricoes_estaduais || []).find((i) => i.ativo);

  return [
    { title: "Razão Social", value: data.razao_social },
    {
      title: "Atividade Principal",
      value: est.atividade_principal?.descricao,
    },
    {
      title: "Atividades Secundárias",
      value: (est.atividades_secundarias || []).map((a) => a.descricao),
    },
    { title: "Endereço", value: enderecoText || "Não disponível" },
    { title: "Email", value: est.email || "Não disponível" },
    { title: "Sócios", value: (data.socios || []).map((s) => s.nome) },
    {
      title: "Inscrição Estadual",
      value: [
        inscricaoAtiva?.inscricao_estadual || "Não disponível",
        inscricaoAtiva?.atualizado_em
          ? formatDate(inscricaoAtiva.atualizado_em)
          : "Não disponível",
      ],
    },
  ];
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

  const sections = buildSections(data);

  sections.forEach((section) => {
    content.appendChild(createCard(section.title, section.value));
  });

  buildFilters(sections);
}
