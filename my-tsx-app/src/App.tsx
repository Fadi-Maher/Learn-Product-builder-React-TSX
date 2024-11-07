import ProductCard from "./components/productCard"
import { ProductList } from "./data"
import Modal from "./components/ui/modal"
import { useState } from "react";
import Button from "./components/ui/button";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const renderProductList = ProductList.map(product => <ProductCard key={product.id} product={product} />)

  return (
    <main className="container mx-auto">

      <Button onClick={openModal} className="bg-indigo-600 text-white p-2 rounded">
        Add Product
      </Button>

      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        title="Add New Product"
      >
        <div className="flex flex-1 gap-2">
          <Button className="bg-indigo-900 p-2 rounded" onClick={closeModal}>submit</Button>
          <Button className="bg-red-900 p-2 rounded" onClick={closeModal}>cancel</Button>

        </div>

         
      </Modal>


      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 container mx-auto gap-3">
        {renderProductList}
      </div>
    </main>

  )
}

export default App
