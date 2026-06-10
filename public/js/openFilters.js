const filtersContainer = document.getElementById("filters-container");
const overlay = document.getElementById("overlay");
const btnFilter = document.getElementById("btn-filter");

btnFilter.addEventListener("click", () => {
  filtersContainer.classList.toggle("open");
  filtersContainer.classList.toggle("filters-container-closed");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  filtersContainer.classList.remove("open");
  filtersContainer.classList.add("filters-container-closed");
  overlay.classList.remove("active");
});
