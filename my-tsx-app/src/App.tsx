import ProductCard from "./components/productCard"
import { ProductList } from "./data"
import Modal from "./components/ui/modal"
import { ChangeEvent, FormEvent, useState } from "react";
import Button from "./components/ui/button";
import { formInputsLists } from "./data";
// import { div } from "framer-motion/client";
// import Modal2 from "./components/ui/modal2";
import Input from "./components/ui/input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
// import { object } from "yup";
import ErrorMsg from "./components/errorMsg";
import { colors } from "./data";
import CircleColor from "./components/circleColor";
// import { input } from "framer-motion/client";
// import { Description } from "@headlessui/react";

function App() {

  const [product, setProduct] = useState<IProduct>({
    title: '',
    description: '',
    imgURL: '',
    price: '',
    category: '',
    colors: []
  })

  const [errors , setErrors] = useState({ title: '',description: '', imgURL: '',price: '',})
  const [tempColors , setTempColors] = useState<string[]>([])

  function onchangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target
    setProduct({
      ...product,
      [name]: value
    })
    setErrors({
      ...errors,
      [name]: ""
    })
  }

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log(product);
    const errors = productValidation(
      {
        title: product.title,
        description: product.description,
        imgURL: product.imgURL,
        price: product.price
      });
      // console.log(errors)
      
      const hasErrorMsg = Object.values(errors).some(value => value=== "")&& Object.values(errors).every(value => value=== "")
      if (!hasErrorMsg){
        setErrors(errors)
        return
      } 
    console.log("sent")
  }


  const onCancel = () => {
    console.log("canceled");
    setProduct({
      title: '',
      description: '',
      imgURL: '',
      price: '',
      category: '',
      colors: []
    })
    closeModal()
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  // const [modal2Show, setModal2Show] = useState(false)

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const renderProductList = ProductList.map(product => <ProductCard key={product.id} product={product} />)
  const renderFormInputList = formInputsLists.map(input => (

    <div className="flex flex-col w-80" key={input.id}>
      <label className="font-semibold" htmlFor={input.id}>{input.label}</label>
      <Input type="text" id={input.id} name={input.name} value={product[input.name]} onChange={onchangeHandler} />
      <ErrorMsg msg={errors[input.name]}/>
    </div>
   ));

const renderProductColor= colors.map((color)=>{
  return  <CircleColor color={color} key={color}
   onClick={()=>{
    setTempColors((prev)=>[...prev , color])
  }}/>
})

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
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputList}
       
       <div className="flex items-center space-x-2">
        {renderProductColor}
       </div>
          

          <div className="flex flex-1 gap-2">
            <Button className="bg-indigo-900 p-2 rounded  "  >submit</Button>
            <Button className="bg-red-900 p-2 rounded " onClick={onCancel}>cancel</Button>
          </div>


        </form>

      </Modal>


      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 container mx-auto gap-3">
        {renderProductList}
      </div>


    </main>

  )
}

export default App
