"use client";

import { Encomenda } from "@/app/types/encomenda";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Encomendas() {

  const [encomendas, setEncomendas] = useState<Encomenda[]>([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {

    try {

      const resposta = await axios.get<Encomenda[]>(
        "http://localhost:8080/encomenda"
      );

      setEncomendas(resposta.data);

    } catch (error) {

      console.error(error);
      alert("Erro ao carregar as encomendas!");

    }
  };

  const handleDeletarEncomenda = async (
    encomenda: Encomenda
  ) => {

    if (!confirm("Deseja realmente cancelar esta encomenda?")) {
      return;
    }

    try {

      const resposta = await axios.delete(
        `http://localhost:8080/encomenda/${encomenda.id}/excluir`
      );

      if (resposta.status === 200) {

        alert("Encomenda cancelada com sucesso!");
        carregarDados();

      }

    } catch (error) {

      console.error(error);
      alert("Erro ao cancelar a encomenda!");

    }
  };

  const handleAlterarStatus = async (
    encomenda: Encomenda
  ) => {

    let novoStatus = encomenda.statusEncomenda;

    if (encomenda.statusEncomenda === "PREPARANDO") {

      novoStatus = "ENTREGA";

    } else if (encomenda.statusEncomenda === "ENTREGA") {

      novoStatus = "ENTREGUE";

    } else {

      alert(
        "Não é possível alterar o status desta encomenda."
      );

      return;
    }

    try {

      const resposta = await axios.patch(
        `http://localhost:8080/encomenda/${encomenda.id}/status`,
        {
          statusEncomenda: novoStatus
        }
      );

      if (resposta.status === 200) {

        alert("Status atualizado com sucesso!");
        carregarDados();

      }

    } catch (error) {

      console.error(error);
      alert("Erro ao atualizar o status da encomenda!");

    }
  };

  return (
    <div className="w-full bg-green-50 p-6 md:p-8 font-sans">

      {/* CABEÇALHO */}

      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">

        <div>

          <h1 className="text-2xl md:text-3xl font-bold text-green-900 tracking-tight">
            Gestão de encomendas
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Consulte e acompanhe as encomendas da confeitaria.
          </p>

        </div>

        <Link
          href="/encomendas/novo"
          className="inline-flex items-center justify-center px-4 py-2.5 bg-pink-400 hover:bg-pink-500 text-white font-medium text-sm rounded-xl shadow-sm transition-colors duration-150"
        >
          Nova Encomenda
        </Link>

      </div>

      {/* TABELA */}

      <div className="w-full">

        <div className="bg-white border border-pink-100 rounded-xl shadow-sm overflow-hidden w-full">

          <div className="overflow-x-auto w-full">

            <table className="w-full text-left border-collapse">

              <thead>

                <tr className="bg-pink-50 border-b border-pink-100">

                  <th className="px-6 py-3.5 text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Código
                  </th>

                  <th className="px-6 py-3.5 text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Pedido
                  </th>

                  <th className="px-6 py-3.5 text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Entrega
                  </th>

                  <th className="px-6 py-3.5 text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Classificação
                  </th>

                  <th className="px-6 py-3.5 text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Status
                  </th>

                  <th className="px-6 py-3.5 text-xs font-semibold text-green-800 uppercase tracking-wider">
                    Ações
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-pink-100">

                {encomendas.map((encomenda) => (

                  <tr
                    key={encomenda.id}
                    className="hover:bg-green-50 transition-colors duration-150"
                  >

                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {encomenda.id}
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {encomenda.dataPedido || "-"}
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {encomenda.prazo}
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {encomenda.classificacao}
                    </td>

                    <td className="px-6 py-4 text-sm font-medium">

                      <span
                        className={
                          encomenda.statusEncomenda === "ENTREGUE"
                            ? "text-green-600"
                            : encomenda.statusEncomenda === "CANCELADO"
                            ? "text-red-600"
                            : encomenda.statusEncomenda === "ENTREGA"
                            ? "text-blue-600"
                            : "text-orange-600"
                        }
                      >
                        {encomenda.statusEncomenda}
                      </span>

                    </td>

                    <td className="px-6 py-4 text-sm font-medium">

                      <div className="flex items-center gap-3">

                        {/* EDITAR */}

                        {encomenda.statusEncomenda !== "ENTREGUE" &&
                          encomenda.statusEncomenda !== "CANCELADO" && (

                            <Link
                              href={`/encomendas/${encomenda.id}/editar`}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Editar
                            </Link>

                          )}

                        {/* CANCELAR */}

                        {encomenda.statusEncomenda !== "ENTREGUE" &&
                          encomenda.statusEncomenda !== "CANCELADO" && (

                            <button
                              onClick={() =>
                                handleDeletarEncomenda(encomenda)
                              }
                              className="text-red-600 hover:text-red-800"
                            >
                              Cancelar
                            </button>

                          )}

                        {/* AVANÇAR STATUS */}

                        {encomenda.statusEncomenda !== "ENTREGUE" &&
                          encomenda.statusEncomenda !== "CANCELADO" && (

                            <button
                              onClick={() =>
                                handleAlterarStatus(encomenda)
                              }
                              className="text-green-600 hover:text-green-800"
                            >
                              Avançar
                            </button>

                          )}

                      </div>

                    </td>

                  </tr>

                ))}

                {encomendas.length === 0 && (

                  <tr>

                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-gray-600 italic"
                    >
                      Nenhuma encomenda encontrada!
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}
