"use client";

import { Encomenda } from "@/app/types/encomenda";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EncomendaForm from "../../components/encomendaForm";

export default function EditarEncomenda() {

  const parametro = useParams();

  const codigo = Number(parametro.codigo);

  const [encomenda, setEncomenda] =
    useState<Encomenda | null>(null);

  const router = useRouter();


  useEffect(() => {

    buscarDados();

  }, []);


  const buscarDados = async () => {

    try {

      const resposta = await axios.get<Encomenda[]>(
        "http://localhost:8080/encomenda"
      );


      const encontrada = resposta.data.find(
        (item) => item.id === codigo
      );


      if (encontrada) {

        setEncomenda(encontrada);

      } else {

        router.push("/encomendas");

      }

    } catch (error) {

      console.error(error);

      router.push("/encomendas");

    }

  };


  if (!encomenda) {

    return (

      <div className="p-8 text-green-900">

        Carregando dados...

      </div>

    );

  }


  if (encomenda.statusEncomenda === "ENTREGUE") {

    return (

      <div className="space-y-6">


        <div className="bg-green-700 p-6 rounded-3xl shadow-lg">

          <h1 className="text-2xl font-bold text-white">

            Encomenda entregue

          </h1>

          <p className="text-sm text-green-100 mt-1">

            Esta encomenda não pode mais ser modificada.

          </p>

        </div>


        <div className="bg-white border border-green-100 rounded-3xl p-8 shadow-lg">

          <p className="text-gray-700 mb-6">

            A encomenda #{encomenda.id} já possui o status{" "}

            <strong>ENTREGUE</strong>.

            <br />

            De acordo com a regra de negócio, seus dados
            não podem mais ser alterados.

          </p>


          <Link
            href="/encomendas"
            className="inline-flex px-5 py-3 bg-pink-400 hover:bg-pink-500 text-white font-semibold rounded-xl transition"
          >

            &larr; Voltar para encomendas

          </Link>

        </div>

      </div>

    );

  }


  return (

    <div className="space-y-6">


      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-green-700 to-green-600 p-6 rounded-3xl shadow-lg">

        <div>

          <h1 className="text-2xl font-bold text-white flex items-center gap-2">

            🧁 Editar encomenda

          </h1>

          <p className="text-sm text-green-100 mt-1">

            Atualize os dados da encomenda #{codigo}.

          </p>

        </div>


        <Link
          href="/encomendas"
          className="inline-flex items-center justify-center text-sm font-medium text-green-900 bg-white hover:bg-pink-50 px-4 py-2.5 rounded-xl transition shadow-sm"
        >

          &larr; Voltar

        </Link>

      </div>


      <div className="bg-white border border-pink-100 rounded-3xl p-6 md:p-8 shadow-lg">

        <EncomendaForm
          encomendaExistente={encomenda}
        />

      </div>

    </div>

  );

}