import './App.css'
import Cart from './components/Cart'
import ProductList from './components/ProductList'

function App() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Интернет-магазин</h1>
        <p className="text-gray-600">Лучшие товары по лучшим ценам</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ProductList />
        </div>
        <div>
          <Cart />
        </div>
      </div>
    </div>
  )
}

export default App
