import { Formik, Field, Form } from "formik"
import { form } from "framer-motion/m";
import { ReactNode } from "react";

interface Iprops {
  productName: string;
  description: string;
  imgUrl: string;
  price: number;
  children : ReactNode

}


const Modal2 = ({ productName,description,imgUrl,price ,children }: Iprops) => {

  return (
    <div >
       <h2>{children}</h2>

       <Formik initialValues={{
           productName : productName , 
           description : description , 
           imgUrl : imgUrl , 
           price : price,
            }}
           onSubmit={(values)=>{
            console.log("Form values:", values);
           }}
           >

            {()=> (
              <Form>
                  <div>
                    <label htmlFor="productName"></label>
                    <Field
                      type="text"
                      id="productName"
                      name="productName"
                      placeholder="Enter product name"
                     />
                  </div>

                  <div>
                    <label htmlFor="productName"></label>
                    <Field
                      type="text"
                      id="productName"
                      name="productName"
                      placeholder="Enter product name"
                     />
                  </div>
                  
                  <div>
                    <label htmlFor="productName"></label>
                    <Field
                      type="text"
                      id="productName"
                      name="productName"
                      placeholder="Enter product name"
                     />
                  </div>

              </Form>

            )
             }
            



       </Formik>
    </div>

  )
}

export default Modal2
