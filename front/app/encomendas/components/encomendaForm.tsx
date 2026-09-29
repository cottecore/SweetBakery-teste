"use client";

import {
  Encomenda,
  EncomendaFormProps,
} from "@/app/types/encomenda";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function EncomendaForm({
  encomendaExistente,
}: EncomendaFormProps) {
  const router = useRouter();

  const [encomenda, setEncomenda] = useState<Encomenda>(
    encomendaExistente ||
      new Encomenda(
        null,
        "",
        "",
        "",
        "PREPARANDO"
      )
  );

  const [carregando, setCarregando] = useState(false);

  const handlerSalvar = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (carregando) {
      return;
    }

    // ============================
    // VALIDAÇÕES
    // ============================

    if (!encomenda.dataPedido) {
      alert("Informe a data do pedido.");
      return;
    }

    if (!encomenda.prazo) {
      alert("Informe o prazo de entrega.");
      return;
    }

    if (!encomenda.classificacao) {
      alert("Selecione a classificação.");
      return;
    }

    // ============================
    // VALIDAÇÃO DAS DATAS
    // ============================

    const dataPedido = new Date(
      `${encomenda.dataPedido}T00:00:00`
    );

    const prazo = new Date(
      `${encomenda.prazo}T00:00:00`
    );

    if (prazo < dataPedido) {
      alert(
        "O prazo de entrega não pode ser anterior à data do pedido."
      );
      return;
    }

    // ============================
    // REGRA PARA FESTA
    // ============================

    if (
      encomenda.classificacao.toUpperCase() ===
      "FESTA"
    ) {
      const prazoMinimo = new Date(dataPedido);

      prazoMinimo.setDate(
        prazoMinimo.getDate() + 3
      );

      if (prazo < prazoMinimo) {
        alert(
          "Para encomendas classificadas como Festa, o prazo deve ser de pelo menos 3 dias após a data do pedido."
        );
        return;
      }
    }

    setCarregando(true);

    try {
      // ============================
      // CADASTRO
      // ============================

      const resposta = await axios.post(
        "http://localhost:8080/encomenda",
        {
          dataPedido: encomenda.dataPedido,
          prazo: encomenda.prazo,
          classificacao:
            encomenda.classificacao.toUpperCase(),
        }
      );

      if (
        resposta.status === 200 ||
        resposta.status === 201
      ) {
        alert(
          "Encomenda cadastrada com sucesso!"
        );

        router.push("/encomendas");
        router.refresh();
      }
    } catch (error: any) {
      console.error(
        "================================="
      );

      console.error(
        "ERRO AO CADASTRAR ENCOMENDA"
      );

      console.error(
        "================================="
      );

      if (error.response) {
        console.error(
          "Status:",
          error.response.status
        );

        console.error(
          "Resposta:",
          error.response.data
        );

        if (
          typeof error.response.data ===
          "string"
        ) {
          alert(error.response.data);
        } else if (
          error.response.data?.message
        ) {
          alert(error.response.data.message);
        } else {
          alert(
            "O servidor recusou o cadastro da encomenda."
          );
        }
      } else if (error.request) {
        console.error(
          "O servidor não respondeu."
        );

        alert(
          "Não foi possível conectar ao servidor. Verifique se o backend está rodando."
        );
      } else {
        console.error(
          "Erro:",
          error.message
        );

        alert(
          "Ocorreu um erro ao cadastrar a encomenda."
        );
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <form
      onSubmit={handlerSalvar}
      className="space-y-6"
    >
      {/* DATA DO PEDIDO */}

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-green-900">
          Data do pedido
        </label>

        <input
          type="date"
          name="dataPedido"
          value={encomenda.dataPedido}
          required
          onChange={(e) =>
            setEncomenda(
              new Encomenda(
                encomenda.id,
                e.target.value,
                encomenda.prazo,
                encomenda.classificacao,
                encomenda.statusEncomenda
              )
            )
          }
          className="w-full px-4 py-3 bg-green-50 border border-green-100 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300"
        />
      </div>

      {/* PRAZO */}

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-green-900">
          Prazo de entrega
        </label>

        <input
          type="date"
          name="prazo"
          value={encomenda.prazo}
          required
          min={encomenda.dataPedido || undefined}
          onChange={(e) =>
            setEncomenda(
              new Encomenda(
                encomenda.id,
                encomenda.dataPedido,
                e.target.value,
                encomenda.classificacao,
                encomenda.statusEncomenda
              )
            )
          }
          className="w-full px-4 py-3 bg-green-50 border border-green-100 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300"
        />
      </div>

      {/* CLASSIFICAÇÃO */}

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-green-900">
          Classificação
        </label>

        <select
          name="classificacao"
          value={encomenda.classificacao}
          required
          onChange={(e) =>
            setEncomenda(
              new Encomenda(
                encomenda.id,
                encomenda.dataPedido,
                encomenda.prazo,
                e.target.value,
                encomenda.statusEncomenda
              )
            )
          }
          className="w-full px-4 py-3 bg-green-50 border border-green-100 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          <option value="">
            Selecione uma classificação
          </option>

          <option value="FESTA">
            Festa
          </option>

          <option value="OUTROS">
            Outros
          </option>
        </select>
      </div>

      {/* STATUS */}

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-green-900">
          Status da encomenda
        </label>

        <input
          type="text"
          value="Preparando"
          disabled
          className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
        />

        <p className="text-xs text-gray-500">
          Toda nova encomenda começa automaticamente
          com o status Preparando.
        </p>
      </div>

      {/* BOTÕES */}

      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-6 border-t border-pink-100">
        <Link
          href="/encomendas"
          className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm rounded-xl transition text-center"
        >
          Cancelar
        </Link>

        <button
          type="submit"
          disabled={carregando}
          className="px-6 py-3 bg-pink-400 hover:bg-pink-500 disabled:bg-pink-200 text-white font-semibold text-sm rounded-xl shadow-md transition"
        >
          {carregando
            ? "Cadastrando..."
            : "Cadastrar encomenda"}
        </button>
      </div>
    </form>
  );
}
