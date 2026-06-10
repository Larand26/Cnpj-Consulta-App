const filtersContent = document.getElementById("filters-content");

function createFilter(title, key) {
  const filter = document.createElement("div");
  filter.className = "filter";

  const input = document.createElement("input");
  input.type = "checkbox";
  input.dataset.key = key;
  input.id = `filter-${key}`;
  filter.appendChild(input);

  const label = document.createElement("label");
  label.htmlFor = input.id;
  label.textContent = title;
  filter.appendChild(label);

  return filter;
}

export default function buildFilters(sections) {
  if (!filtersContent) return;

  filtersContent.innerHTML = "";

  if (!Array.isArray(sections) || sections.length === 0) {
    return;
  }

  sections.forEach((section) => {
    const key = section.title.toLowerCase().replace(/\s+/g, "-");
    filtersContent.appendChild(createFilter(section.title, key));
  });
}
