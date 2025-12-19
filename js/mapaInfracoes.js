export const MAPA_INFRACOES = {
  EXTRAS: {
    ACUMULO_DE_AGUA: {
      label: "Materiais que possam acumular água expostos",
      bases: [
        {
          lei: "lei_10083_98",
          artigo: "art14",
          incisos: ["i"]
        },
        {
          lei: "lei_municipal_889_1980_andradina",
          artigo: "art70"
        }
      ]
    },

    REINCIDENCIA: {
      label: "Reincidência",
      bases: [
        {
          lei: "lei_10083_98",
          artigo: "art118",
          incisos: ["v"]
        }
      ]
    },

    OBSTRUÇÃO: {
      label: "Obstrução de fiscalização",
      bases: [
        {
          lei: "lei_10083_98",
          artigo: "art122",
          incisos: ["viii"]
        }
      ]
    },

    NOTIFICACAO_DESCUMPRIDA: {
      label: "Deixou de atender notificação formalmente lavrada",
      bases: [
        {
          lei: "lei_10083_98",
          artigo: "art118",
          incisos: ["iii"]
        }
      ]
    }
  },

  ATIVIDADE: {
    FERRO_VELHO: {
      label: "Ferro-velho / Sucatas",
      bases: [
        {
          lei: "lei_municipal_2584_2010_andradina",
          artigo: "art14"
        }
      ]
    }
  },

  PESSOA_FISICA: {
    BASE: {
      label: "Base legal obrigatória",
      bases: [
        {
          lei: "lei_10083_98",
          artigo: "art110"
        },
        {
          lei: "lei_10083_98",
          artigo: "art123",
          paragrafo: "par1"
        }
      ]
    },

    TEMATICO: {
      LIMPEZA_E_ORGANIZACAO: {
        label: "Desorganização e falta de limpeza",
        bases: [
          {
            lei: "lei_10083_98",
            artigo: "art12"
          },
          {
            lei: "lei_10083_98",
            artigo: "art14",
            incisos: ["iv"]
          },
          {
            lei: "decreto_12342_78",
            artigo: "art355",
            paragrafo: "par1",
            incisos: ["iv"]
          },
          {
            lei: "lei_municipal_889_1980_andradina",
            artigo: "art66"
          },
          {
            lei: "lei_municipal_889_1980_andradina",
            artigo: "art69"
          },
          {
            lei: "lei_municipal_2584_2010_andradina",
            artigo: "art1"
          }
        ]
      }
    }
  },

  PESSOA_JURIDICA: {
    BASE: {
      label: "Base legal obrigatória",
      bases: [
        {
          lei: "lei_10083_98",
          artigo: "art110"
        },
        {
          lei: "lei_10083_98",
          artigo: "art123",
          paragrafo: "par1"
        }
      ]
    },

    TEMATICO: {
      LIMPEZA_E_ORGANIZACAO: {
        label: "Desorganização e falta de limpeza",
        bases: [
          {
            lei: "lei_10083_98",
            artigo: "art12"
          },
          {
            lei: "lei_10083_98",
            artigo: "art14",
            incisos: ["iv"]
          },
          {
            lei: "decreto_12342_78",
            artigo: "art355",
            paragrafo: "par1",
            incisos: ["iv"]
          },
          {
            lei: "lei_municipal_889_1980_andradina",
            artigo: "art66"
          },
          {
            lei: "lei_municipal_2584_2010_andradina",
            artigo: "art10"
          }
        ]
      },
      PRODUTO_VENCIDO: {
        label: "Expor à venda ou entregar ao consumo produtos vencidos",
        bases: [
          {
            lei: "lei_10083_98",
            artigo: "art122",
            incisos: ["xiii"]
          }
        ]
      }
    }
  }
};
