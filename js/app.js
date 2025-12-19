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

  const leisMap = new Map();
  bases.forEach(b => {
    if (!leisMap.has(b.lei)) leisMap.set(b.lei, []);
    leisMap.get(b.lei).push(b);
  });

  let html = "";
  leisMap.forEach((basesLei, leiId) => {
    const lei = LEIS[leiId];
    html += `<div class="lei-container"><strong>${lei.nome}:</strong>`;

    const artigosMap = new Map();
    basesLei.forEach(b => {
      const key = `${b.artigo}|${b.paragrafo || ""}`;

      const origemSet = new Set();
      if (b.origem) {
        if (b.origem instanceof Set) b.origem.forEach(o => origemSet.add(o));
        else if (Array.isArray(b.origem)) b.origem.forEach(o => origemSet.add(o));
        else origemSet.add(b.origem);
      }

      if (!artigosMap.has(key)) {
        artigosMap.set(key, {
          artigo: b.artigo,
          paragrafo: b.paragrafo,
          incisos: new Set(b.incisos || []),
          origem: origemSet
        });
      } else {
        const entry = artigosMap.get(key);
        (b.incisos || []).forEach(i => entry.incisos.add(i));
        origemSet.forEach(o => entry.origem.add(o));
      }
    });

    Array.from(artigosMap.values()).forEach(a => {
      const artigoData = lei.artigos[a.artigo];

      // Parágrafo com tooltip também
      let paragrafoHtml = "";
      if (a.paragrafo) {
        const parData = artigoData.paragrafos[a.paragrafo];
        paragrafoHtml = ` <span class="artigo" style="font-weight:normal;">§ ${parData.numero}º<span class="tooltip">${parData.texto}</span></span>`;
      }

      // Incisos com tooltip restrito à letra
      let incisosHtml = "";
      if (a.incisos.size) {
        const incArray = Array.from(a.incisos).sort();
        const fonte = a.paragrafo ? artigoData.paragrafos[a.paragrafo].incisos : artigoData.incisos;
        incisosHtml = ", " + incArray
          .map(i => `inciso <span class="inciso">${i.toUpperCase()}<span class="tooltip">${fonte[i]}</span></span>`)
          .join(" e ");
      }

      const origemHtml = a.origem.size
        ? `<div class="origem">Origem: ${Array.from(a.origem).join(", ")}</div>`
        : "";

      html += `<div class="artigo-item">
                 Art. <span class="artigo">${artigoData.numero}<span class="tooltip">${artigoData.caput}</span></span>${paragrafoHtml}${incisosHtml}
                 ${origemHtml}
               </div>`;
    });

    html += "</div>";
  });

  resultadoDiv.innerHTML = html;
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

  // ATIVIDADES
  const atividadeDiv = document.createElement("div");
  atividadeDiv.className = "grupo";
  atividadeDiv.innerHTML = "<strong>Atividades</strong>";
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
