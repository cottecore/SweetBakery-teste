import Link from "next/link";
import UsuarioForm from "../components/UsuarioForm";

export default function CadastroUsuario() {
  return (
    <div className="space-y-6">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-pink-400 to-pink-500 p-6 rounded-3xl shadow-lg">

        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            👩‍🍳 Novo cadastro
          </h1>

          <p className="text-sm text-pink-100 mt-1">
            Cadastre um novo cliente ou confeiteira.
          </p>
        </div>

        <Link
          href="/usuarios"
          className="inline-flex items-center justify-center text-sm font-semibold text-pink-700 bg-white hover:bg-pink-50 px-4 py-2.5 rounded-xl transition shadow-sm"
        >
          &larr; Voltar
        </Link>

      </div>

      <div className="bg-white border border-pink-100 rounded-3xl p-6 md:p-8 shadow-lg">

        <div className="mb-6">
          <h2 className="text-xl font-bold text-green-900">
            Dados do cadastro
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Preencha as informações abaixo.
          </p>
        </div>

        <UsuarioForm />

      </div>

    </div>
  );
}