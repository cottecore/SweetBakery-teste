
import Link from "next/link";
import ClienteForm from "../components/ClienteForm";

export default function CadastroCliente() {
  return (
    <div className="space-y-6">

      {/* ============================
          CABEÇALHO
      ============================ */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-pink-400 to-pink-500 p-6 rounded-3xl shadow-lg">

        <div>

          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            👤 Novo cliente
          </h1>

          <p className="text-sm text-pink-100 mt-1">
            Cadastre um novo cliente.
          </p>

        </div>

        <Link
          href="/cliente"
          className="inline-flex items-center justify-center text-sm font-semibold text-pink-700 bg-white hover:bg-pink-50 px-4 py-2.5 rounded-xl transition shadow-sm"
        >
          &larr; Voltar
        </Link>

      </div>

      {/* ============================
          FORMULÁRIO
      ============================ */}

      <div className="bg-white border border-pink-100 rounded-3xl p-6 md:p-8 shadow-lg">

        <div className="mb-6">

          <h2 className="text-xl font-bold text-green-900">
            Dados do cliente
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Informe o nome do cliente abaixo.
          </p>

        </div>

        <ClienteForm />

      </div>

    </div>
  );
}
