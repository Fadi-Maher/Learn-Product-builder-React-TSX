import ProductCard from "./components/productCard";
import { ProductList } from "./data";
import Modal from "./components/ui/modal";
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
import { v4 as uuid } from "uuid";
import Category from "./components/ui/select";
import { categories } from "./data";

// import { input } from "framer-motion/client";
// import { Description } from "@headlessui/react";

function App() {
  const [product, setProduct] = useState<IProduct>({
    title: "",
    description: "",
    imgURL: "",
    price: "",
    category: {
      name: "",
      imgURL: "",
    },
    colors: [],
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imgURL: "",
    price: "",
  });
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<IProduct[]>(ProductList);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [productEdit, setProductEdit] = useState<IProduct>({
    title: "",
    description: "",
    imgURL: "",
    price: "",
    category: {
      name: "",
      imgURL: "",
    },
    colors: [],
  });

  const [selectedCategory, setSelectedCategory] = useState(categories[2]);

  function onchangeHandler(event: ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  }

  const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // console.log(product);
    const errors = productValidation({
      title: product.title,
      description: product.description,
      imgURL: product.imgURL,
      price: product.price,
    });
    // console.log(errors)

    const hasErrorMsg = Object.values(errors).some((value) => value !== "");
    if (hasErrorMsg) {
      setErrors(errors);
      return;
    }
    // console.log("sent")
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productEdit.id
          ? { ...p, ...product, colors: tempColors, category: selectedCategory }
          : p
      )
    );

    setProduct({
      title: "",
      description: "",
      imgURL: "",
      price: "",
      category: {
        name: "",
        imgURL: "",
      },
      colors: [],
    });
    setTempColors([]);
    setIsEditOpen(false);
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // console.log(product);
    const errors = productValidation({
      title: product.title,
      description: product.description,
      imgURL: product.imgURL,
      price: product.price,
    });
    // console.log(errors)

    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    // console.log("sent")
    setProducts((prev) => [
      {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);
    setProduct({
      title: "",
      description: "",
      imgURL: "",
      price: "",
      category: {
        name: "",
        imgURL: "",
      },
      colors: [],
    });
    setTempColors([]);
    closeModal();
  };

  const onCancel = () => {
    console.log("canceled");
    setProduct({
      title: "",
      description: "",
      imgURL: "",
      price: "",
      category: {
        name: "",
        imgURL: "",
      },
      colors: [],
    });
    closeModal();
  };

  // const [modal2Show, setModal2Show] = useState(false)

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openEditModal = (product: IProduct) => {
    setProductEdit(product);
    setProduct({
      ...product,
      title: product.title,
      description: product.description,
      imgURL: product.imgURL,
      category: { ...product.category },
      price: product.price,
    });
    setTempColors(product.colors);
    setIsEditOpen(true);
  };

  const closeEditModal = () => setIsEditOpen(false);

  const renderProductList = products.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductEdit={openEditModal}
    />
  ));

  const renderFormInputList = formInputsLists.map((input) => (
    <div className="flex flex-col w-80" key={input.id}>
      <label className="font-semibold" htmlFor={input.id}>
        {input.label}
      </label>
      <Input
        type="text"
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={onchangeHandler}
      />
      <ErrorMsg msg={errors[input.name]} />
    </div>
  ));

  const renderProductColor = colors.map((color) => {
    return (
      <CircleColor
        color={color}
        key={color}
        onClick={() => {
          if (tempColors.includes(color)) {
            setTempColors((prev) => prev.filter((item) => item !== color));
            return;
          }
          setTempColors((prev) => [...prev, color]);
        }}
      />
    );
  });

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

      <Button
        onClick={openModal}
        className="bg-indigo-600 text-white p-2 rounded"
      >
        Add Product
      </Button>
      {/* add  model*/}
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        title="Add New Product"
      >
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputList}

          <Category
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />

          <div className="flex items-center space-x-2">
            {renderProductColor}
          </div>

          <div className="flex items-center flex-wrap space-x-1">
            {tempColors.map((color) => (
              <span
                className="p-1 rounded"
                style={{ backgroundColor: color }}
                key={color}
              >
                {color}
              </span>
            ))}
          </div>

          <div className="flex flex-1 gap-2">
            <Button className="bg-indigo-900 p-2 rounded  ">submit</Button>
            <Button className="bg-red-900 p-2 rounded " onClick={onCancel}>
              cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Product Modal */}
      {isEditOpen && (
        <Modal
          isOpen={isEditOpen}
          closeModal={closeEditModal}
          title="Edit Product"
        >
          <form className="space-y-3" onSubmit={submitEditHandler}>
            {renderFormInputList}

            <Category
              selected={selectedCategory}
              setSelected={setSelectedCategory}
            />

            <div className="flex items-center space-x-2">
              {renderProductColor}
            </div>

            <div className="flex items-center flex-wrap space-x-1">
              {tempColors.map((color) => (
                <span
                  className="p-1 rounded"
                  style={{ backgroundColor: color }}
                  key={color}
                >
                  {color}
                </span>
              ))}
            </div>

            <div className="flex flex-1 gap-2">
              <Button className="bg-indigo-900 p-2 rounded">Submit</Button>
              <Button className="bg-red-900 p-2 rounded" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 container mx-auto gap-3">
        {renderProductList}
      </div>
    </main>
  );
}

export default App;
