import { ButtonHTMLAttributes, ReactNode } from "react"

 interface Iprops extends ButtonHTMLAttributes<HTMLElement>{
   children : ReactNode;
   className?: string
 }

const Button = ({children, className, ...rest}:Iprops) => {
  return (
    <button className={`text-white p-2 rounded w-full font-bold${className}`} {...rest}>
        {children}
    </button>
  )
}

export default Button
