"use client";

import { useState } from "react";

const produtos = [
{
id: 1,
emoji: "🧁",
nome: "Cupcake de Morango",
categoria: "Doces",
descricao: "Cupcake macio com cobertura cremosa e morangos.",
preco: "R$ 8,00",
status: "Disponível",
},
{
id: 2,
emoji: "🍰",
nome: "Bolo de Festa",
categoria: "Bolos",
descricao: "Bolo personalizado perfeito para comemorações.",
preco: "R$ 85,00",
status: "Disponível",
},
{
id: 3,
emoji: "🍪",
nome: "Cookies com Chocolate",
categoria: "Doces",
descricao: "Cookies crocantes por fora e macios por dentro.",
preco: "R$ 15,00",
status: "Disponível",
},
{
id: 4,
emoji: "🍓",
nome: "Torta de Morango",
categoria: "Tortas",
descricao: "Torta cremosa com morangos frescos e cobertura especial.",
preco: "R$ 65,00",
status: "Disponível",
},
{
id: 5,
emoji: "🍫",
nome: "Brownie Gourmet",
categoria: "Doces",
descricao: "Brownie de chocolate intenso com textura cremosa.",
preco: "R$ 12,00",
status: "Disponível",
},
{
id: 6,
emoji: "🎂",
nome: "Bolo de Chocolate",
categoria: "Bolos",
descricao: "Bolo de chocolate com recheio cremoso e cobertura.",
preco: "R$ 75,00",
status: "Disponível",
},
{
id: 7,
emoji: "🍋",
nome: "Torta de Limão",
categoria: "Tortas",
descricao: "Torta refrescante de limão com cobertura delicada.",
preco: "R$ 55,00",
status: "Disponível",
},
{
id: 8,
emoji: "🍩",
nome: "Donuts Decorados",
categoria: "Doces",
descricao: "Donuts artesanais decorados com sabores variados.",
preco: "R$ 10,00",
status: "Disponível",
},
];

export default function ProdutosPage() {
const [busca, setBusca] = useState("");

const produtosFiltrados = produtos.filter((produto) =>
`${produto.nome} ${produto.categoria}`
.toLowerCase()
.includes(busca.toLowerCase())
);

return ( <div className="space-y-6">

```
  {/* CABEÇALHO */}

  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-green-600 to-green-500 p-6 rounded-3xl shadow-lg">

    <div>
      <h1 className="text-2xl font-bold text-white flex items-center gap-2">
        🍰 Produtos
      </h1>

      <p className="text-sm text-green-100 mt-1">
        Confira os produtos disponíveis na SweetBakery.
      </p>
    </div>

    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-white text-sm font-medium">
      {produtos.length} produtos
    </div>

  </div>

  {/* ÁREA DE BUSCA */}

  <div className="bg-white border border-pink-100 rounded-3xl p-5 shadow-lg">

    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      <div>
        <h2 className="text-lg font-bold text-green-900">
          Nosso catálogo
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Encontre o doce perfeito para sua encomenda.
        </p>
      </div>

      <div className="relative w-full md:w-80">

        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>

        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar produto..."
          className="w-full pl-11 pr-4 py-3 bg-green-50 border border-green-100 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
        />

      </div>

    </div>

  </div>

  {/* PRODUTOS */}

  {produtosFiltrados.length > 0 ? (

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

      {produtosFiltrados.map((produto) => (

        <div
          key={produto.id}
          className="group bg-white border border-pink-100 rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >

          {/* ÁREA DA IMAGEM */}

          <div className="relative h-44 bg-gradient-to-br from-pink-100 via-pink-50 to-green-100 flex items-center justify-center">

            <div className="text-7xl group-hover:scale-110 transition-transform duration-300">
              {produto.emoji}
            </div>

            <div className="absolute top-4 right-4">
              <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-green-700 text-xs font-semibold rounded-full shadow-sm">
                ● {produto.status}
              </span>
            </div>

          </div>

          {/* INFORMAÇÕES */}

          <div className="p-5">

            <div className="flex items-center justify-between gap-2 mb-2">

              <span className="text-xs font-semibold text-pink-500 bg-pink-50 px-2.5 py-1 rounded-full">
                {produto.categoria}
              </span>

            </div>

            <h3 className="text-lg font-bold text-green-900">
              {produto.nome}
            </h3>

            <p className="text-sm text-gray-500 mt-2 min-h-[40px]">
              {produto.descricao}
            </p>

            <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">

              <div>
                <p className="text-xs text-gray-400">
                  A partir de
                </p>

                <p className="text-xl font-bold text-pink-500">
                  {produto.preco}
                </p>
              </div>

              <button
                type="button"
                className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 text-sm font-semibold rounded-xl transition"
              >
                Ver produto
              </button>

            </div>

          </div>

        </div>

      ))}

    </div>

  ) : (

    /* NENHUM PRODUTO */

    <div className="bg-white border border-pink-100 rounded-3xl p-10 shadow-lg text-center">

      <div className="text-5xl mb-4">
        🔎
      </div>

      <h3 className="text-lg font-bold text-green-900">
        Nenhum produto encontrado
      </h3>

      <p className="text-sm text-gray-500 mt-2">
        Tente pesquisar por outro nome ou categoria.
      </p>

    </div>

  )}

  {/* RODAPÉ INFORMATIVO */}

  <div className="bg-gradient-to-r from-pink-50 to-green-50 border border-pink-100 rounded-3xl p-5">

    <div className="flex flex-col sm:flex-row sm:items-center gap-4">

      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm">
        🧁
      </div>

      <div>
        <h3 className="font-bold text-green-900">
          Feito com carinho pela SweetBakery
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Escolha seus produtos favoritos e faça sua encomenda.
        </p>
      </div>

    </div>

  </div>

</div>

);
}
