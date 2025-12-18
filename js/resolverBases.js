export function resolverBases({ tipoPessoa, tematicos = [], extras = [], atividades = [] }) {
  const bases = [];

  bases.push(...tipoPessoa.BASE.bases);

  atividades.forEach(opcao => {
    bases.push(...opcao.bases);
  });

  tematicos.forEach(opcao => {
    bases.push(...opcao.bases);
  });

  extras.forEach(opcao => {
    bases.push(...opcao.bases);
  });

  const map = new Map();

  bases.forEach(b => {
    const key = [
      b.lei,
      b.artigo,
      b.paragrafo || "",
      (b.incisos || []).join(",")
    ].join("|");

    if (!map.has(key)) {
      map.set(key, b);
    }
  });

  return [...map.values()];
}
