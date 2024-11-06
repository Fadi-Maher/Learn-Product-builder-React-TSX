 import ProductCard from "./components/productCard"
import { ProductList } from "./data"
function App() {
 

const renderProductList=ProductList.map(product => <ProductCard key={product.id} product={product}/>)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6">
     {renderProductList}
    </div>
  )
}

export default App
