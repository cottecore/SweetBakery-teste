export default function Home() {
    return (
      <div className="space-y-8">
  
        <div>
          <span className="text-pink-500 font-semibold text-sm">
            Bem-vinda à SweetBakery 🧁
          </span>
  
          <h1 className="text-3xl md:text-4xl font-bold text-green-950 mt-1">
            Painel de controle
          </h1>
  
          <p className="text-gray-600 mt-2">
            Gerencie clientes, confeiteiras, produtos e encomendas.
          </p>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
  
          <div className="bg-white border border-pink-100 rounded-3xl p-6 shadow-sm">
            <div className="text-3xl">👤</div>
            <p className="text-sm text-gray-500 mt-4">
              Clientes
            </p>
            <h2 className="text-2xl font-bold text-green-900">
              Gerenciar
            </h2>
          </div>
  
          <div className="bg-white border border-green-100 rounded-3xl p-6 shadow-sm">
            <div className="text-3xl">👩‍🍳</div>
            <p className="text-sm text-gray-500 mt-4">
              Confeiteiras
            </p>
            <h2 className="text-2xl font-bold text-green-900">
              Gerenciar
            </h2>
          </div>
  
          <div className="bg-white border border-pink-100 rounded-3xl p-6 shadow-sm">
            <div className="text-3xl">🧁</div>
            <p className="text-sm text-gray-500 mt-4">
              Produtos
            </p>
            <h2 className="text-2xl font-bold text-green-900">
              Gerenciar
            </h2>
          </div>
  
          <div className="bg-white border border-green-100 rounded-3xl p-6 shadow-sm">
            <div className="text-3xl">📦</div>
            <p className="text-sm text-gray-500 mt-4">
              Encomendas
            </p>
            <h2 className="text-2xl font-bold text-green-900">
              Gerenciar
            </h2>
          </div>
  
        </div>
  
        <div className="bg-gradient-to-r from-pink-100 to-green-100 rounded-3xl p-8 border border-white">
  
          <h2 className="text-2xl font-bold text-green-950">
            🍰 Controle de encomendas
          </h2>
  
          <p className="mt-2 text-green-800 max-w-2xl">
            Acompanhe o andamento das encomendas e mantenha os pedidos
            organizados desde o cadastro até a entrega.
          </p>
  
        </div>
  
      </div>
    );
  }