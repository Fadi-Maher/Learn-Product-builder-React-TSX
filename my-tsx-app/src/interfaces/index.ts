export interface IProduct {
    id?: number;
    title: string;
    price: string;
    description: string;
    category: string;
    imgURL: string;
    colors: string[];
}

export interface IformInput {
    id: string;
    name : 'title'| "description" | "imgURL" | "price";
    label:string;
    type:string
}

