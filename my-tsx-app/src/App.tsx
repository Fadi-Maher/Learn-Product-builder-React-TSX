import ProductCard from "./components/productCard"
import { ProductList } from "./data"
import Modal from "./components/ui/modal"
import { ChangeEvent, useState } from "react";
import Button from "./components/ui/button";
import { formInputsLists } from "./data";
// import { div } from "framer-motion/client";
// import Modal2 from "./components/ui/modal2";
import Input from "./components/ui/input";
import { IProduct } from "./interfaces";
// import { Description } from "@headlessui/react";

function App() {

const [product , setProduct]= useState<IProduct>({
   title : '',
  description:'',
  imgURL : '',
  price : '',
  category : '',
  colors:[]
})

function onchangeHandler(event : ChangeEvent<HTMLInputElement>){
  const {value , name} = event.target
  setProduct({
    ...product , 
    [name] : value
  })
}

  const [isModalOpen, setIsModalOpen] = useState(false);

  // const [modal2Show, setModal2Show] = useState(false)

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const renderProductList = ProductList.map(product => <ProductCard key={product.id} product={product} />)
  const renderFormInputList = formInputsLists.map(input  => (

    <div className="flex flex-col w-80">
        <label htmlFor={input.id}>{input.label}</label>
        <Input type="text" id={input.id} name={input.name}  value={product[input.name]} onChange={onchangeHandler} />
    </div>

  ));

  return (

    <main className="container mx-auto">
{/* 
      <Button onClick={() => setModal2Show(true)}
        className="bg-indigo-600 text-white p-2 rounded mt-10">
        Add newwww Product
      </Button>


      {modal2Show && (

        <Modal2 onClose={() => setModal2Show(false)}>
          <div>add new product</div>
        </Modal2>

      )} */}


      <Button onClick={openModal} className="bg-indigo-600 text-white p-2 rounded">
        Add Product
      </Button>

 
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        title="Add New Product"
      >
 
      {renderFormInputList}

 
      <div className="flex flex-1 gap-2">
          <Button className="bg-indigo-900 p-2 rounded  " onClick={closeModal}>submit</Button>
          <Button className="bg-red-900 p-2 rounded " onClick={closeModal}>cancel</Button>

        </div>


      </Modal>


      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 container mx-auto gap-3">
        {renderProductList}
      </div>





    </main>

  )
}

export default App
