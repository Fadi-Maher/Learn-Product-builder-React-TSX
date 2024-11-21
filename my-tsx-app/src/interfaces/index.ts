export interface IProduct {
    id?: string;
    title: string;
    price: string;
    description: string;
    category: string;
    imgURL: string;
    colors: string[];
}

export interface IformInput {
    id: string   ;
    name : 'title'| "description" | "imgURL" | "price";
    label:string;
    type:string
}

export interface Icategory {
    id : string ;
    name : string ; 
    imageURL : string 
}