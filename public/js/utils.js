const formatDate = (dateString) => {
  if (!dateString) return "Data não disponível";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export { formatDate };
