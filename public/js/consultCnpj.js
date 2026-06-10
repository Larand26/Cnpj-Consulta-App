import buildDataContent from "./buildData.js";
const btn = document.getElementById("btn-search");
const input = document.getElementById("input-cnpj");

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const cnpj = input.value;
    fetchCnpjData(cnpj);
  }
});

btn.addEventListener("click", () => {
  const cnpj = input.value;
  fetchCnpjData(cnpj);
});

async function fetchCnpjData(cnpj) {
  try {
    const response = await fetch(`/cnpj-consult`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cnpj }),
    });
    const data = await response.json();
    console.log(data);
    if (!data.success) {
      console.error("Erro ao consultar o CNPJ:", data.message);
      return;
    }
    buildDataContent(data.data);
  } catch (error) {
    console.error("Erro ao consultar o CNPJ:", error);
  }
}
