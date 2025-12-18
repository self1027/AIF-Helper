import { MAPA_INFRACOES } from "./mapaInfracoes.js";
import { resolverBases } from "./resolverBases.js";

const opcoesDiv = document.getElementById("opcoes");
const resultadoDiv = document.getElementById("resultado");
const tipoPessoaSelect = document.getElementById("tipoPessoa");

const LEIS = {};
const tematicosSelecionados = new Set();
const extrasSelecionados = new Set();
const atividadesSelecionadas = new Set();

async function carregarLeis() {
  const arquivos = [
    "lei_10083_98.json",
    "decreto_12342_78.json",
    "lei_municipal_889_1980_andradina.json",
    "lei_municipal_2584_2010_andradina.json"
  ];

  for (const arq of arquivos) {
    const resp = await fetch(`./leis/${arq}`);
    const json = await resp.json();
    LEIS[json.id] = json;
  }
}

function renderOpcao(opcao, set) {
  const div = document.createElement("div");
  div.className = "opcao";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  checkbox.addEventListener("change", () => {
    checkbox.checked ? set.add(opcao) : set.delete(opcao);
    renderResultado();
  });

  div.appendChild(checkbox);
  div.append(" " + opcao.label);
  return div;
}

function renderResultado() {
  const tipo = MAPA_INFRACOES[tipoPessoaSelect.value];

  const bases = resolverBases({
    tipoPessoa: tipo,
    tematicos: [...tematicosSelecionados],
    atividades: [...atividadesSelecionadas],
    extras: [...extrasSelecionados]
  });

  resultadoDiv.innerHTML = bases.map(renderBaseLegal).join("");
}

function renderBaseLegal(base) {
  const lei = LEIS[base.lei];
  const artigo = lei.artigos[base.artigo];

  const artigoHtml = `
    <span class="artigo">
      Art. ${artigo.numero}
      <span class="tooltip">${artigo.caput}</span>
    </span>
  `;

  const paragrafoHtml = base.paragrafo
    ? ` § ${artigo.paragrafos[base.paragrafo].numero}º`
    : "";

  let incisosHtml = "";

  if (base.incisos) {
    const fonte = base.paragrafo
      ? artigo.paragrafos[base.paragrafo].incisos
      : artigo.incisos;

    incisosHtml = base.incisos.map(i => `
      <span class="inciso">
        inciso ${i.toUpperCase()}
        <span class="tooltip">${fonte[i]}</span>
      </span>
    `).join(", ");
  }

  return `<p>${artigoHtml}${paragrafoHtml}${incisosHtml ? ", " + incisosHtml : ""} (${lei.nome}).</p>`;
}

function montarOpcoes() {
  opcoesDiv.innerHTML = "";
  tematicosSelecionados.clear();
  extrasSelecionados.clear();
  atividadesSelecionadas.clear();
  resultadoDiv.innerHTML = "";

  const tipo = MAPA_INFRACOES[tipoPessoaSelect.value];

  // TEMÁTICOS
  const tematicoDiv = document.createElement("div");
  tematicoDiv.className = "grupo";
  tematicoDiv.innerHTML = "<strong>Temáticos</strong>";

  Object.values(tipo.TEMATICO).forEach(opcao => {
    tematicoDiv.appendChild(renderOpcao(opcao, tematicosSelecionados));
  });

  // ATIVIDADE
  const atividadeDiv = document.createElement("div");
  atividadeDiv.className = "grupo";
  atividadeDiv.innerHTML = "<strong>Atividade</strong>";

  Object.values(MAPA_INFRACOES.ATIVIDADE).forEach(opcao => {
    atividadeDiv.appendChild(renderOpcao(opcao, atividadesSelecionadas));
  });

  // EXTRAS
  const extrasDiv = document.createElement("div");
  extrasDiv.className = "grupo";
  extrasDiv.innerHTML = "<strong>Extras</strong>";

  Object.values(MAPA_INFRACOES.EXTRAS).forEach(opcao => {
    extrasDiv.appendChild(renderOpcao(opcao, extrasSelecionados));
  });

  opcoesDiv.appendChild(tematicoDiv);
  opcoesDiv.appendChild(atividadeDiv);
  opcoesDiv.appendChild(extrasDiv);
}

async function init() {
  await carregarLeis();
  montarOpcoes();
  tipoPessoaSelect.addEventListener("change", montarOpcoes);
}

init();
