import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fffafc] text-[#33443a]">

      {/* Cabeçalho */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur border-b border-pink-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="w-11 h-11 rounded-full bg-pink-100 flex items-center justify-center text-2xl">
              🧁
            </div>

            <div>
              <h1 className="font-bold text-xl text-green-900">
                Sweet<span className="text-pink-500">Bakery</span>
              </h1>

              <p className="text-xs text-gray-500">
                Confeitaria & Encomendas
              </p>
            </div>
          </Link>

          <nav className="flex items-center gap-3">
            <Link
              href="#sobre"
              className="hidden sm:block px-4 py-2 text-sm font-medium text-green-800 hover:text-pink-500 transition"
            >
              Sobre
            </Link>

            <Link
              href="#recursos"
              className="hidden sm:block px-4 py-2 text-sm font-medium text-green-800 hover:text-pink-500 transition"
            >
              Recursos
            </Link>

            <Link
              href="/login"
              className="px-5 py-2.5 bg-pink-400 hover:bg-pink-500 text-white rounded-full font-semibold shadow-md transition"
            >
              Entrar
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-semibold mb-6">
                🍰 Gestão de confeitaria
              </span>

              <h2 className="text-4xl md:text-6xl font-bold leading-tight text-green-950">
                Suas encomendas,
                <span className="text-pink-500"> mais doces.</span>
              </h2>

              <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
                A SweetBakery ajuda confeiteiras e clientes a controlar
                produtos, encomendas, valores e prazos em um único lugar.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/login"
                  className="px-7 py-3.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold shadow-lg transition"
                >
                  Acessar sistema
                </Link>

                <Link
                  href="#recursos"
                  className="px-7 py-3.5 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-xl font-semibold transition"
                >
                  Conhecer recursos
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-pink-200/30 blur-3xl rounded-full"></div>

              <div className="relative bg-gradient-to-br from-pink-100 to-green-100 rounded-[2rem] p-10 shadow-xl border border-white">
                <div className="text-center">
                  <div className="text-8xl mb-6">
                    🧁
                  </div>

                  <h3 className="text-3xl font-bold text-green-900">
                    SweetBakery
                  </h3>

                  <p className="mt-3 text-green-700">
                    Controle completo para sua confeitaria.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-white/80 rounded-2xl p-4 text-center">
                    <div className="text-2xl">🍰</div>
                    <p className="text-sm font-semibold text-green-800 mt-2">
                      Produtos
                    </p>
                  </div>

                  <div className="bg-white/80 rounded-2xl p-4 text-center">
                    <div className="text-2xl">📦</div>
                    <p className="text-sm font-semibold text-green-800 mt-2">
                      Encomendas
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Sobre */}
        <section
          id="sobre"
          className="py-20 px-6 bg-white"
        >
          <div className="max-w-4xl mx-auto text-center">

            <span className="text-pink-500 font-semibold">
              Sobre a SweetBakery
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-green-950 mt-2">
              Organização para deixar a confeitaria mais simples
            </h2>

            <p className="mt-6 text-gray-600 text-lg leading-relaxed">
              A SweetBakery foi desenvolvida para facilitar o controle de
              produtos, clientes, confeiteiras e encomendas, permitindo
              acompanhar cada pedido desde sua criação até a entrega.
            </p>

          </div>
        </section>

        {/* Recursos */}
        <section
          id="recursos"
          className="py-20 px-6 bg-green-50"
        >
          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-12">
              <span className="text-pink-500 font-semibold">
                Recursos
              </span>

              <h2 className="text-3xl md:text-4xl font-bold text-green-950 mt-2">
                Tudo para controlar sua confeitaria
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

              <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100">
                <div className="text-4xl mb-4">👩‍🍳</div>
                <h3 className="text-xl font-bold text-green-900">
                  Confeiteiras
                </h3>
                <p className="text-gray-600 mt-2">
                  Cadastro e gerenciamento das confeiteiras.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100">
                <div className="text-4xl mb-4">👤</div>
                <h3 className="text-xl font-bold text-green-900">
                  Clientes
                </h3>
                <p className="text-gray-600 mt-2">
                  Controle dos clientes e seus pedidos.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100">
                <div className="text-4xl mb-4">🧁</div>
                <h3 className="text-xl font-bold text-green-900">
                  Produtos
                </h3>
                <p className="text-gray-600 mt-2">
                  Organização dos produtos e suas classificações.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100">
                <div className="text-4xl mb-4">📦</div>
                <h3 className="text-xl font-bold text-green-900">
                  Encomendas
                </h3>
                <p className="text-gray-600 mt-2">
                  Acompanhe o status e prazo de cada encomenda.
                </p>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Rodapé */}
      <footer className="bg-green-950 text-green-100 py-8 text-center">
        <p className="font-semibold">
          🍰 SweetBakery
        </p>

        <p className="text-sm text-green-300 mt-1">
          Controle de Encomendas de Confeitaria
        </p>

        <p className="text-xs text-green-400 mt-4">
          © {new Date().getFullYear()} SweetBakery. Todos os direitos reservados.
        </p>
      </footer>

    </div>
  );
}